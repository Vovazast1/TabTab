import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityType } from '../data';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss']
})
export class ActivityPage implements OnInit {
  constructor(private router: Router) {}

  intelligence() {
    this.router.navigate(['pages/locations', ActivityType.Intelligence]);
  }

  ngOnInit() {}
}
