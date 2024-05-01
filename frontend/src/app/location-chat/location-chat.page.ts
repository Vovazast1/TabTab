import { Component, OnInit } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { ApiService } from '../providers/ApiService';
import { Message } from '../data';

@Component({
  selector: 'app-location-chat',
  templateUrl: './location-chat.page.html',
  styleUrls: ['./location-chat.page.scss']
})
export class LocationChatPage implements OnInit {
  stompClient: any;
  message: Message = {
    userId: '',
    message: '',
    timestamp: ''
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  setConnected(connected: boolean) {
    const connectButton = document.getElementById('connect') as HTMLButtonElement;
    const disconnectButton = document.getElementById('disconnect') as HTMLButtonElement;
    const conversationDiv = document.getElementById('conversationDiv');
    const responseDiv = document.getElementById('response');

    connectButton.disabled = connected;
    disconnectButton.disabled = !connected;
    conversationDiv!.style.visibility = connected ? 'visible' : 'hidden';
    responseDiv!.innerHTML = '';
  }

  // connect(): void {
  //   const socket = new SockJS('/chat');
  //   this.stompClient = Stomp.over(socket);
  //   this.stompClient.connect(
  //     {},
  //     (frame: any) => {
  //       this.setConnected(true);
  //       console.log('Connected: ' + frame);
  //       this.stompClient.subscribe('/topic/messages', (messageOutput: Message) => {
  //         this.showMessageOutput(messageOutput);
  //       });
  //     },
  //     (error: any) => {
  //       console.error('Error connecting to WebSocket server:', error);
  //     }
  //   );
  // }

  sendMessage(message: Message): void {
    if (this.stompClient && message) {
      this.stompClient.send('/app/chat', {}, JSON.stringify({ from: message.userId, message: message.message }));
    }
  }

  showMessageOutput(messageOutput: Message): void {
    const response = document.getElementById('response');
    const p = document.createElement('p');
    p.style.wordWrap = 'break-word';
    p.appendChild(
      document.createTextNode(
        messageOutput.userId + ': ' + messageOutput.message + ' (' + messageOutput.timestamp + ')'
      )
    );
    response?.appendChild(p);
  }
}
