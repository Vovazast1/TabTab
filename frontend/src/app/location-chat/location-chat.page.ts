import { Component, OnInit, inject } from '@angular/core';
import { Message } from '../data';
import { WebSocketAPI } from '../components/WebSocketAPI';
import { ApiService } from '../providers/ApiService';

@Component({
  selector: 'app-location-chat',
  templateUrl: './location-chat.page.html',
  styleUrls: ['./location-chat.page.scss']
})
export class LocationChatPage implements OnInit {
  public readonly webSocketApi = inject(WebSocketAPI);

  constructor(
    private apiService: ApiService,
    webSocketApi: WebSocketAPI
  ) {}
  webSocketAPI!: WebSocketAPI;
  messages: any;
  message: Message = {
    userId: '',
    message: '',
    timestamp: ''
  };

  ngOnInit() {}

  public connect() {
    this.webSocketAPI.connect();
  }

  public disconnect() {
    this.webSocketAPI.disconnect();
  }

  public sendMessage() {
    this.webSocketAPI.sendMessage(this.message);
    this.message.message = ''; // Clear message text after sending
  }

  public handleMessage(message: any) {
    this.messages = message;
  }
}
