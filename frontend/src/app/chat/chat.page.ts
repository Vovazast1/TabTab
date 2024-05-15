import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SocketService } from '../components/SocketService';
import { ApiService } from '../providers/ApiService';
import { TimeService } from '../components/TimeService';
import { ActivityType, Intelligence, Location, Sport, storageKeys, User } from '../data';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '../components/activity.service';
import * as L from 'leaflet';
import { forkJoin, mergeMap, of, take, timestamp } from 'rxjs';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss']
})
export class ChatPage implements OnInit {
  public user!: User;
  messageInput: string = '';
  messageList: any[] = [];
  private _messagesEndRef?: ElementRef;
  location!: Location;
  currentActivity: ActivityType | null = null;
  map!: L.Map;

  @ViewChild('messagesEndRef', { static: false })
  set messagesEndRef(value: ElementRef | undefined) {
    this._messagesEndRef = value;
    this.scrollToBottom();
  }

  constructor(
    private socketService: SocketService,
    private apiService: ApiService,
    private timeService: TimeService,
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService
  ) {}

  ngOnInit() {
    const userId = Number(localStorage.getItem(storageKeys.userId) || '0');
    this.route.params.subscribe(params => {
      const locationId = params['locationId'];
      this.activityService.currentActivity$
        .pipe(
          mergeMap(activity => {
            this.currentActivity = activity;
            if (userId && locationId && this.currentActivity) {
              this.socketService.connect(locationId, userId, message => this.messageList.push(message));
              this.connectSocket();
              return forkJoin([
                this.apiService.getLocationById(locationId),
                this.apiService.getUser(userId),
                this.apiService.getMessages(locationId)
              ]);
            }
            return of([]);
          })
        )
        .subscribe(([location, user, messages]) => {
          this.location = location;
          this.user = user;
          this.messageList = messages;
          this.scrollToBottom();
        });
    });
  }

  connectSocket() {
    this.socketService.getSocketResponse().subscribe(response => {
      this.addMessageToList(response);
    });
  }

  addMessageToList(message: any): void {
    this.messageList.push(message);
    this.scrollToBottom();
  }

  sendMessage(): void {
    console.log(this.socketService);
    if (this.messageInput !== '') {
      this.socketService.sendData({ message: this.messageInput });
      const time = this.timeService.timeStampConverter(Date.now()); // Convert current timestamp

      this.addMessageToList({
        message: this.messageInput,
        userId: this.user.userId,
        timestamp: time,
        messageType: 'CLIENT'
      });
      this.messageInput = '';
    }
  }

  scrollToBottom(): void {
    if (this._messagesEndRef) {
      this._messagesEndRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  goToLocations() {
    if (this.map) {
      this.map.remove();
    }
    this.router.navigate(['pages/locations', this.currentActivity]);
  }
}
