import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { ApiService } from '../providers/ApiService';
import { ActivityType, Location, storageKeys } from '../data';
import { IonModal } from '@ionic/angular';
import Type from '../data/Type';

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
    { src: 'assets/icon/museus-icon.png', label: 'Museum' },
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
            const AnyIcon = L.icon({ iconUrl: 'assets/icon/football-icon.png' });

            const FootballIcon = L.icon({ iconUrl: 'assets/icon/football-icon.png' });
            const BasketballIcon = L.icon({ iconUrl: 'assets/icon/basketball-icon.png' });
            const VolleyballIcon = L.icon({ iconUrl: 'assets/icon/volleyball-icon.png' });
            const GymIcon = L.icon({ iconUrl: 'assets/icon/gym-icon.png' });
            const TennisIcon = L.icon({ iconUrl: 'assets/icon/tennis-icon.png' });

            const ParkIcon = L.icon({ iconUrl: 'assets/icon/park-icon.png' });
            const ChessIcon = L.icon({ iconUrl: 'assets/icon/chess-icon.png' });
            const LibraryIcon = L.icon({ iconUrl: 'assets/icon/library-icon.png' });
            const MuseumIcon = L.icon({ iconUrl: 'assets/icon/museum-icon.png' });
            const MusicIcon = L.icon({ iconUrl: 'assets/icon/music-icon.png' });

            const Icon =
              location.activity === ActivityType.Sport
                ? location.type === Type.Football
                  ? FootballIcon
                  : location.type === Type.Basketball
                    ? BasketballIcon
                    : location.type === Type.Volleyball
                      ? VolleyballIcon
                      : location.type === Type.Gym
                        ? GymIcon
                        : location.type === Type.Tennis
                          ? TennisIcon
                          : AnyIcon
                : location.type === Type.Park
                  ? ParkIcon
                  : location.type === Type.Chess
                    ? ChessIcon
                    : location.type === Type.Library
                      ? LibraryIcon
                      : location.type === Type.Museum
                        ? MuseumIcon
                        : location.type === Type.Music
                          ? MusicIcon
                          : AnyIcon;

            L.marker([location.latitude, location.longitude], { icon: Icon })
              .addTo(this.map)
              .on('click', () => {
                const numberToFind = location.locationId;
                this.findImage(numberToFind);
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

  public getLocationButtons() {
    return this.currentActivity === ActivityType.Sport ? this.locationsSportButtons : this.locationsIntelligenceButtons;
  }

  public getImgSrc() {
    return this.currentActivity === ActivityType.Sport ? this.sportImg : this.intelligenceImg;
  }

  findImage(locationId: number) {
    let n: string = locationId.toString();
    this.l = `assets/modal-img/${n}.png`;
  }

  getLocationTypes() {
    const types = this.locations.map(location => location.type);
    const filteredTypes = types.filter(type => types.includes(type));
    console.log(localStorage.getItem(storageKeys.token));
    return Array.from(new Set(filteredTypes));
  }
}
