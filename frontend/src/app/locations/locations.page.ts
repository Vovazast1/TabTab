import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { ApiService } from '../providers/ApiService';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss']
})
export class LocationsPage implements OnInit {
  map!: L.Map;
  locations: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  BasketballIcon = L.icon({ iconUrl: 'basketball-icon.png' });

  ngOnInit() {
    this.map = new L.Map('map').setView([49.8431, 24.0361], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map Test'
    }).addTo(this.map);

    this.route.params.subscribe(params => {
      const activity = params['activity'];
      this.apiService.getLocationsByActivity(activity).subscribe({
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

    this.map.whenReady(() => {
      setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize();
        }
      }, 1000);
    });
  }
}
