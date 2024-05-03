import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  constructor() {}

  public timeStampConverter(time: number): string {
    const date = new Date(time);
    const minute = date.getMinutes();
    const hour = date.getHours();
    return `${hour}:${minute}`;
  }
}
