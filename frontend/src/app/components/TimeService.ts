import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  constructor() {}

  public timeStampConverter(time: number): Date {
    return new Date(time);
  }
}
