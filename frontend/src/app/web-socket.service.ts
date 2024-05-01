// // web-socket.service.ts
// import { Injectable } from '@angular/core';
// import * as SockJS from 'sockjs-client';
// import * as Stomp from 'stompjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class WebSocketService {
//   private stompClient: any;

//   constructor() {}

//   connect(): void {
//     const socket = new SockJS('/chat');
//     this.stompClient = Stomp.over(socket);
//     this.stompClient.connect({}, (frame: string) => {
//       console.log('Connected: ' + frame);
//       // Handle additional logic upon connection
//     });
//   }

//   disconnect(): void {
//     if (this.stompClient != null) {
//       this.stompClient.disconnect();
//     }
//     console.log('Disconnected');
//   }

//   // Other WebSocket-related methods can be added here
// }
