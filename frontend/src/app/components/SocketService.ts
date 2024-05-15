import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, timestamp } from 'rxjs'; // Import Subject
import io from 'socket.io-client'; // Import only io
import { SOCKET_BASE_URL } from '../data';
import LocationMessage, { MessageType } from '../data/LocationMessage';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  private socketResponseSubject: Subject<any> = new Subject<any>(); // Create a Subject
  private isConnected: boolean = false;
  private locationId?: number;
  private userId?: number;
  private timestamp: any;

  constructor(private http: HttpClient) {}

  public connect(locatioId: number, userId: number, onReceive: (message: LocationMessage) => void): void {
    this.locationId = locatioId;
    this.userId = userId;
    this.timestamp = timestamp;
    this.socket = io(SOCKET_BASE_URL, {
      reconnection: false,
      query: { userId: userId, locatioId: locatioId }
    });
    this.socket.on('connect', () => (this.isConnected = true));
    this.socket.on('read_message', (res: any) => {
      console.log(res);
      onReceive(res);
      this.socketResponseSubject.next({
        locationId: res.locationId,
        message: res.message,
        userId: res.userId,
        messageType: res.messageType,
        timestamp: res.timestamp
      });
    });
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  public sendData(message: LocationMessage) {
    if (!this.locationId || !this.userId) {
      return;
    }
    console.log(message);
    this.socket.emit('send_message', message);
  }

  getSocketResponse(): Observable<any> {
    return this.socketResponseSubject.asObservable(); // Return the Subject as an Observable
  }

  public isConnectedStatus(): boolean {
    return this.isConnected;
  }
}
