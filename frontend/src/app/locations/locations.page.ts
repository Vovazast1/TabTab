import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { ApiService } from '../providers/ApiService';
import { ActivityType, Location, storageKeys, Type } from '../data';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss']
})
export class LocationsPage implements OnInit {
  @ViewChild('modal')
  public modal?: IonModal;
  map!: L.Map;
  locations: Location[] = [];
  currentActivity?: ActivityType;

  public locationsIntelligenceButtons = [
    { src: 'assets/icon/park-icon.png', label: 'Park' },
    { src: 'assets/icon/chess-icon.png', label: 'Chess' },
    { src: 'assets/icon/library-icon.png', label: 'Library' },
    { src: 'assets/icon/museum-icon.png', label: 'Museum' },
    { src: 'assets/icon/music-icon.png', label: 'Music' }
  ];
  public locationsSportButtons = [
    { src: 'assets/icon/football-icon.png', label: 'Football' },
    { src: 'assets/icon/basketball-icon.png', label: 'Basketball' },
    { src: 'assets/icon/volleyball-icon.png', label: 'Volleyball' },
    { src: 'assets/icon/gym-icon.png', label: 'Gym' },
    { src: 'assets/icon/tennis-icon.png', label: 'Tennis' }
  ];

  public sportImg = [{ src: 'assets/icon/intelligence.png' }];
  public intelligenceImg = [{ src: 'assets/icon/sport.png' }];

  public l: string = '';

  private iconMap = {
    [Type.Football]: 'assets/icon/football-icon.png',
    [Type.Volleyball]: 'assets/icon/volleyball-icon.png',
    [Type.Basketball]: 'assets/icon/basketball-icon.png',
    [Type.Tennis]: 'assets/icon/tennis-icon.png',
    [Type.Gym]: 'assets/icon/gym-icon.png',
    [Type.Park]: 'assets/icon/park-icon.png',
    [Type.Chess]: 'assets/icon/chess-icon.png',
    [Type.Library]: 'assets/icon/library-icon.png',
    [Type.Museum]: 'assets/icon/museum-icon.png',
    [Type.Music]: 'assets/icon/music-icon.png'
  };

  private selectedLocationId: number | null = null;

  constructor(
    private ngZone: NgZone,
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
      this.apiService.getLocationsByActivity(this.currentActivity!).subscribe({
        next: locations => {
          this.locations = locations;

          locations.forEach(location => {
            const iconUrl = this.iconMap[location.type] ?? 'assets/icon/favicon.png';
            const icon = L.icon({ iconUrl });

            L.marker([location.latitude, location.longitude], { icon })
              .addTo(this.map)
              .on('click', () => {
                this.selectedLocationId = location.locationId;
                this.setLocationImage(this.selectedLocationId);
                this.ngZone.run(() => this.modal!.present());
              });
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

  async toggleLocationsType() {
    const newActivity = this.currentActivity === ActivityType.Sport ? ActivityType.Intelligence : ActivityType.Sport;

    if (this.map) {
      this.map.remove();
    }
    await this.router.navigate(['pages/locations', newActivity]);
    window.location.reload();
  }

  goToProfile() {
    this.router.navigate(['pages/profile']);
  }

  goToFavorite() {
    this.router.navigate(['pages/favorite']);
  }

  goToChat() {
    this.router.navigate(['pages/chat']);
  }

  addToFavorite() {
    if (this.selectedLocationId !== null) {
      const userId = Number(localStorage.getItem(storageKeys.userId));
      this.apiService.addToFavorite(userId, this.selectedLocationId).subscribe();
    }
  }

  public getLocationButtons() {
    return this.currentActivity === ActivityType.Sport ? this.locationsSportButtons : this.locationsIntelligenceButtons;
  }

  public getImgSrc() {
    return this.currentActivity === ActivityType.Sport ? this.sportImg : this.intelligenceImg;
  }

  setLocationImage(locationId: number) {
    const location = this.locations.find(location => location.locationId === locationId);
    this.l = location?.image ?? '';
  }

  getLocationTypes() {
    const types = this.locations.map(location => location.type);
    const filteredTypes = types.filter(type => types.includes(type));
    return Array.from(new Set(filteredTypes));
  }
}
