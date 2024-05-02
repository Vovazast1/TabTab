// import { ApiService } from '../providers/ApiService';
// import { Message } from '../data';
// import { WebSocketAPI } from '../components/WebSocketAPI';
// import { Injectable, OnInit } from '@angular/core';

// @Injectable()
// export class ChatHandler implements OnInit {
//   webSocketAPI!: WebSocketAPI;
//   messages: any;
//   message: Message = {
//     userId: '',
//     message: '',
//     timestamp: ''
//   };

//   constructor(private apiService: ApiService) {
//     // Provide ApiService in the constructor
//   }

//   ngOnInit() {
//     this.webSocketAPI.connect(); // Connect to WebSocket when ChatHandler initializes
//   }

//   public connect() {
//     this.webSocketAPI.connect();
//   }

//   public disconnect() {
//     this.webSocketAPI.disconnect();
//   }

//   public sendMessage() {
//     this.webSocketAPI.sendMessage(this.message);
//     this.message.message = ''; // Clear message text after sending
//   }

//   public handleMessage(message: any) {
//     this.messages = message;
//   }
// }
