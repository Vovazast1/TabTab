import { Component, NgZone, OnInit, Type, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { ApiService } from '../providers/ApiService';
import { ActivityType, Location, storageKeys, Intelligence, Sport } from '../data';
import { IonModal } from '@ionic/angular';

interface ExtendedMarker {
  nativeMarker: L.Marker;
  location: Location;
}

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

  public imageUrl: String = '';
  public markers: ExtendedMarker[] = [];
  public filteredMarkers: ExtendedMarker[] = [];

  private iconMap = {
    [Sport.Football]: 'assets/icon/football-icon.png',
    [Sport.Volleyball]: 'assets/icon/volleyball-icon.png',
    [Sport.Basketball]: 'assets/icon/basketball-icon.png',
    [Sport.Tennis]: 'assets/icon/tennis-icon.png',
    [Sport.Gym]: 'assets/icon/gym-icon.png',
    [Intelligence.Park]: 'assets/icon/park-icon.png',
    [Intelligence.Chess]: 'assets/icon/chess-icon.png',
    [Intelligence.Library]: 'assets/icon/library-icon.png',
    [Intelligence.Museum]: 'assets/icon/museum-icon.png',
    [Intelligence.Music]: 'assets/icon/music-icon.png'
  };

  private selectedLocationId: number | null = null;
  public selectedLocation: Location | null = null;
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
            const marker = L.marker([location.latitude, location.longitude], { icon })
              .addTo(this.map)
              .on('click', () => {
                this.selectedLocationId = location.locationId;
                this.imageUrl = this.setLocationImage(this.selectedLocationId);
                this.ngZone.run(() => this.modal!.present());

                this.getFavoriteStatus(Number(localStorage.getItem(storageKeys.userId)), location.locationId);
              });

            this.markers.push({ nativeMarker: marker, location });
          });
        },
        error: error => console.log(error)
      });
    });
  }

  initializeMap() {
    this.map = new L.Map('map', { zoomControl: false }).setView([49.8431, 24.0361], 13);
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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
    return location?.image ?? '';
  }

  setLocationName(locationId: number) {
    const location = this.locations.find(location => location.locationId === locationId);
    return location?.locationName ?? '';
  }

  getFavoriteStatus(userId: number, locationId: number) {
    this.apiService.isFavorite(userId, locationId).subscribe({
      next: value => {
        if (value) console.log('FAVORITE, FULL IMAGE');
        else console.log('NOT FAVORITE, BORDER IMAGE');
      }
    });
  }

  getLocationTypes() {
    const types = this.locations.map(location => location.type);
    const filteredTypes = types.filter(type => types.includes(type));
    return Array.from(new Set(filteredTypes));
  }

  handleChange(event: Event) {
    this.markers.forEach((marker: ExtendedMarker) => marker.nativeMarker.remove());

    const typeValue = Array.from((event as any).target.value);
    if (typeValue.length === 0) {
      this.markers.forEach(
        (marker: ExtendedMarker) =>
          (marker.nativeMarker = L.marker([marker.location.latitude, marker.location.longitude], {
            icon: marker.nativeMarker.getIcon()
          })
            .addTo(this.map)
            .on('click', () => this.handleMarkerClick(marker)))
      );
      return;
    }

    this.filteredMarkers = this.markers.filter((marker: ExtendedMarker) => typeValue.includes(marker.location.type));
    this.filteredMarkers.forEach((filteredMarker: ExtendedMarker) => {
      const nativeMarker = L.marker([filteredMarker.location.latitude, filteredMarker.location.longitude], {
        icon: filteredMarker.nativeMarker.getIcon()
      })
        .addTo(this.map)
        .on('click', () => this.handleMarkerClick(filteredMarker));

      const marker = this.markers.find(mark => mark.location.locationId === filteredMarker.location.locationId);
      if (marker) {
        marker.nativeMarker = nativeMarker;
      }
    });
  }

  handleMarkerClick(marker: ExtendedMarker) {
    this.selectedLocationId = marker.location.locationId;
    this.imageUrl = this.setLocationImage(this.selectedLocationId);
    this.ngZone.run(() => this.modal!.present());
  }
}
