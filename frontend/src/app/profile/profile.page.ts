import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityType } from '../data';
import * as L from 'leaflet';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  currentActivity?: ActivityType;
  map!: L.Map;
  public l: string = '';

  constructor(
    private router: Router,
  ) { }


  
  async goToLocations() {
    const newActivity = this.currentActivity === ActivityType.Sport ? ActivityType.Intelligence : ActivityType.Sport;
    if (this.map) {
          this.map.remove();
        }
    await this.router.navigate(['pages/locations', newActivity]);
    window.location.reload();
  }
  
  ngOnInit() {
  }

}

