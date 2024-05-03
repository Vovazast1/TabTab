import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs'; // Import Subject
import io from 'socket.io-client'; // Import only io

import { SOCKET_BASE_URL } from '../data';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  private socketResponseSubject: Subject<any> = new Subject<any>(); // Create a Subject
  private isConnected: boolean = false;
  private room: any;
  private username: any;

  constructor(private http: HttpClient) {}

  public connect(room: string, username: string): void {
    this.socket = io(SOCKET_BASE_URL, {
      reconnection: false,
      query: { username: username, room: room }
    });
    this.socket.on('connect', () => (this.isConnected = true));
    this.socket.on('read_message', (res: any) => {
      console.log(res);
      this.socketResponseSubject.next({
        // Emit value to the Subject
        room: res.room,
        content: res.content,
        username: res.username,
        messageType: res.messageType,
        createdDateTime: res.createdDateTime
      });
    });
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  public sendData(payload: any): void {
    this.socket.emit('send_message', {
      room: 'asd',
      content: payload.content,
      username: 'jopa00',
      messageType: 'CLIENT'
    });
  }

  getSocketResponse(): Observable<any> {
    return this.socketResponseSubject.asObservable(); // Return the Subject as an Observable
  }

  public isConnectedStatus(): boolean {
    return this.isConnected;
  }
}
