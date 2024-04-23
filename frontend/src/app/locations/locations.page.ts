import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import * as L from 'leaflet';
import { ApiService } from '../providers/ApiService';
import ActivityType from '../data/ActivityType';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss']
})
export class LocationsPage implements OnInit {
  map!: L.Map;
  locations: any;
  currentActivity?: ActivityType;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeMap();

    this.goToLocations();

    this.map.whenReady(() => {
      setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize();
        }
      }, 1000);
    });
  }

  goToLocations() {
    this.route.params.subscribe(params => {
      this.currentActivity = params['activity'];
      this.apiService.getLocationsByActivity(this.currentActivity || ActivityType.Intelligence).subscribe({
        next: locations => {
          this.locations = locations;

          locations.forEach(location => {
            const BasketballIcon = L.icon({ iconUrl: 'assets/icon/basketball-icon.png' });
            L.marker([location.latitude, location.longitude], { icon: BasketballIcon })
              .addTo(this.map)
              .bindPopup(location.locationName);
          });
        },
        error: error => console.log(error)
      });
    });
  }

  initializeMap() {
    this.map = new L.Map('map', { zoomControl: false }).setView([49.8431, 24.0361], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map Test'
    }).addTo(this.map);
  }

  toggleLocationsType() {
    const newActivity = this.currentActivity === ActivityType.Sport ? ActivityType.Intelligence : ActivityType.Sport;

    if (this.map != undefined) {
      this.map.remove();
    }
    this.router.navigate(['pages/locations', newActivity]).then(() => {
      window.location.reload();
    });
  }
}
