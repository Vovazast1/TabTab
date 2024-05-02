import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ApiService } from '../providers/ApiService';
import { Message } from '../data';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketAPI {
  private apiService: ApiService;

  stompClient: any;
  message: Message = {
    userId: '',
    message: '',
    timestamp: ''
  };
  locationCahtPage: any;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  ngOnInit() {}

  public connect() {
    let socket = SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect(
      {},
      function (frame: any) {
        _this.stompClient.subscribe('/topic/messages', function (messageOutput: Message) {
          _this.showMessageOutput(messageOutput);
        });
      },
      this.errorCallBack
    );
  }

  public disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  public errorCallBack(error: string) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  public sendMessage(message: any) {
    this.stompClient.send('/app/chat', {}, JSON.stringify({ from: message.userId, message: message.message }));
  }

  public showMessageOutput(messageOutput: Message) {
    console.log('Message Received from Server :: ' + messageOutput.message); // Accessing the message property directly
    this.locationCahtPage.handleMessage(JSON.stringify(messageOutput)); // Passing the entire message object
  }

  //   const response = document.getElementById('response');
  //   const p = document.createElement('p');
  //   p.style.wordWrap = 'break-word';
  //   p.appendChild(
  //     document.createTextNode(
  //       messageOutput.userId + ': ' + messageOutput.message + ' (' + messageOutput.timestamp + ')'
  //     )
  //   );
  //   response?.appendChild(p);
  // }
}
