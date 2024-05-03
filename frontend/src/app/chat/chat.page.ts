import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SocketService } from '../components/SocketService';
import { ApiService } from '../providers/ApiService';
import { TimeService } from '../components/TimeService';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss']
})
export class ChatPage implements OnInit {
  room!: string;
  username!: string;
  messageInput: string = '';
  messageList: any[] = [];

  private _messagesEndRef?: ElementRef;

  @ViewChild('messagesEndRef', { static: false })
  set messagesEndRef(value: ElementRef | undefined) {
    this._messagesEndRef = value;
    this.scrollToBottom();
  }

  constructor(
    private socketService: SocketService,
    private apiService: ApiService,
    private timeService: TimeService
  ) {}

  ngOnInit(): void {
    // Initialize room and username here
    this.socketService.connect('asd', 'jopa00');
    this.room = 'Your Room';
    this.username = 'Your Username';
    this.connectSocket();
    this.fetchMessages();
  }

  connectSocket(): void {
    this.socketService.getSocketResponse().subscribe(response => {
      this.addMessageToList(response);
    });
  }

  fetchMessages(): void {
    this.apiService.getMessages(this.room).subscribe(
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
    if (this.messageInput !== '') {
      this.socketService.sendData({ content: this.messageInput });
      const time = this.timeService.timeStampConverter(Date.now()); // Convert current timestamp
      this.addMessageToList({
        content: this.messageInput,
        username: this.username,
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
