import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SocketService } from '../components/SocketService';
import { ApiService } from '../providers/ApiService';
import { TimeService } from '../components/TimeService';
import { Location, storageKeys } from '../data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss']
})
export class ChatPage implements OnInit {
  userId!: number;
  messageInput: string = '';
  messageList: any[] = [];
  private _messagesEndRef?: ElementRef;
  locationId?: number;
  locationName?: string;

  @ViewChild('messagesEndRef', { static: false })
  set messagesEndRef(value: ElementRef | undefined) {
    this._messagesEndRef = value;
    this.scrollToBottom();
  }

  constructor(
    private socketService: SocketService,
    private apiService: ApiService,
    private timeService: TimeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userId = parseInt(localStorage.getItem(storageKeys.userId) || '0');
    this.route.params.subscribe(params => {
      this.locationId = params['locationId'];
      this.locationName = params['locationName'];

      if (this.userId && this.locationId) {
        this.socketService.connect(this.locationId, this.userId, message => this.messageList.push(message));
        this.connectSocket();
        this.fetchMessages();
      }
    });
  }

  connectSocket() {
    this.socketService.getSocketResponse().subscribe(response => {
      this.addMessageToList(response);
    });
  }

  fetchMessages() {
    this.locationId &&
      this.apiService.getMessages(this.locationId).subscribe(
        responseData => {
          this.messageList = responseData;
          this.scrollToBottom();
        },
        error => {
          console.error('Error fetching messages:', error);
        }
      );
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
        userId: this.userId,
        createdDateTime: time,
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
}
