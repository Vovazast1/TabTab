import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, timestamp } from 'rxjs';
import io from 'socket.io-client';
import { SOCKET_BASE_URL } from '../data';
import LocationMessage, { MessageType } from '../data/LocationMessage';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  private socketResponseSubject: Subject<any> = new Subject<any>();
  private isConnected: boolean = false;
  private locationId?: number;
  private userId?: number;
  private timestamp: any;

  public connect(locationId: number, userId: number): void {
    this.locationId = locationId;
    this.userId = userId;
    this.timestamp = timestamp;
    this.socket = io(SOCKET_BASE_URL, {
      reconnection: false,
      query: { userId: userId, locationId: locationId }
    });
    this.socket.on('connect', () => (this.isConnected = true));
    this.socket.on('read_message', (message: LocationMessage) => {
      this.socketResponseSubject.next(message);
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
    this.socket.emit('send_message', message);
  }

  getSocketResponse(): Observable<any> {
    return this.socketResponseSubject.asObservable(); // Return the Subject as an Observable
  }

  public isConnectedStatus(): boolean {
    return this.isConnected;
  }
}
