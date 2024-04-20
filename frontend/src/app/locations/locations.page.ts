import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {
  map!: L.Map;

  constructor() { }
  
  BasketballIcon = L.icon({ iconUrl: 'basketball-icon.png' });


  ngOnInit() {
    this.map = new L.Map('map').setView([49.8431, 24.0361], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map Test',
    }).addTo(this.map);


    const BasketballIcon = L.icon({ iconUrl: 'assets/icon/basketball-icon.png' });
    L.marker([49.7990987168452, 24.052929394779834], { icon: BasketballIcon }).addTo(this.map).bindPopup("I am a basketball marker.");





    this.map.whenReady(() => {
      setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize();
        }
      }, 1000);
    });
  }
  

  }
