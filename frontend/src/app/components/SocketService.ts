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
  private locationId?: number;
  private userId?: number;

  constructor(private http: HttpClient) {}

  public connect(locatioId: number, userId: number): void {
    this.socket = io(SOCKET_BASE_URL, {
      reconnection: false,
      query: { userId: userId, locatioId: locatioId }
    });
    this.socket.on('connect', () => (this.isConnected = true));
    this.socket.on('read_message', (res: any) => {
      console.log(res);
      this.socketResponseSubject.next({
        // Emit value to the Subject
        locationId: res.locationId,
        message: res.message,
        userId: res.userId,
        messageType: res.messageType,
        createdDateTime: res.createdDateTime
      });
    });
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  public sendData(payload: any) {
    this.socket.emit('send_message', {
      locationId: this.locationId,
      message: payload.message,
      userId: this.userId,
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
