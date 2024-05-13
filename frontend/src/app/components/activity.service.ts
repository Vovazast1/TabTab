import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivityType } from '../data';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private currentActivitySubject: BehaviorSubject<ActivityType | null> = new BehaviorSubject<ActivityType | null>(null);
  public currentActivity$: Observable<ActivityType | null> = this.currentActivitySubject.asObservable();

  constructor() {}

  setCurrentActivity(activity: ActivityType) {
    this.currentActivitySubject.next(activity);
  }

  getCurrentActivity(): ActivityType | null {
    return this.currentActivitySubject.value;
  }
}
