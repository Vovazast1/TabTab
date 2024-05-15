import { Component, NgZone, OnInit, Type, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { ApiService } from '../providers/ApiService';
import { ActivityType, Location, storageKeys, Intelligence, Sport, Favorite } from '../data';
import { IonModal } from '@ionic/angular';
import { ActivityService } from '../components/activity.service';
import { getUserId } from '../utils';

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
  favorites: Favorite[] = [];
  currentActivity: ActivityType | null = null;

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
    private activityService: ActivityService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeMap();

    this.loadFavorites();

    this.activityService.currentActivity$.subscribe(activity => {
      this.currentActivity = activity;
      if (activity) {
        this.loadLocations(activity);
      }
    });
    this.route.params.subscribe(params => {
      const initialActivity = params['activity'];
      if (initialActivity) {
        this.activityService.setCurrentActivity(initialActivity);
      }
    });

    this.map.whenReady(() => {
      setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize();
        }
      }, 1000);
    });
  }

  loadLocations(activity: ActivityType) {
    this.apiService.getLocationsByActivity(activity).subscribe({
      next: locations => {
        this.locations = locations;

        locations.forEach(location => {
          const iconUrl = this.iconMap[location.type] ?? 'assets/icon/favicon.png';
          const icon = L.icon({ iconUrl });
          const marker = L.marker([location.latitude, location.longitude], { icon })
            .addTo(this.map)
            .on('click', () => this.handleMarkerClick(location));

          this.markers.push({ nativeMarker: marker, location });
        });
      },
      error: error => console.log(error)
    });
  }

  loadFavorites() {
    this.apiService.getFavorites(getUserId()).subscribe({
      next: favorites => {
        this.favorites = favorites;
      }
    });
  }

  getFavorites() {
    console.log(this.favorites);
    return this.favorites;
  }

  initializeMap() {
    this.map = new L.Map('map', { zoomControl: false }).setView([49.8431, 24.0361], 13);
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map Test'
    }).addTo(this.map);
  }

  async toggleLocationsType() {
    const newActivity = this.currentActivity === ActivityType.Sport ? ActivityType.Intelligence : ActivityType.Sport;

    this.activityService.setCurrentActivity(newActivity);

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
      const userId = getUserId();
      this.apiService.addToFavorite(userId, this.selectedLocationId).subscribe();
      this.getFavoriteStatus(this.selectedLocationId);
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

  getFavoriteStatus(locationId: number) {
    return this.favorites.some(favorite => favorite.locationId === locationId);
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
            .on('click', () => this.handleMarkerClick(marker.location)))
      );
      return;
    }

    this.filteredMarkers = this.markers.filter((marker: ExtendedMarker) => typeValue.includes(marker.location.type));
    this.filteredMarkers.forEach((filteredMarker: ExtendedMarker) => {
      const nativeMarker = L.marker([filteredMarker.location.latitude, filteredMarker.location.longitude], {
        icon: filteredMarker.nativeMarker.getIcon()
      })
        .addTo(this.map)
        .on('click', () => this.handleMarkerClick(filteredMarker.location));

      const marker = this.markers.find(mark => mark.location.locationId === filteredMarker.location.locationId);
      if (marker) {
        marker.nativeMarker = nativeMarker;
      }
    });
  }

  handleMarkerClick(location: Location) {
    this.selectedLocation = location;
    this.selectedLocationId = location.locationId;
    this.imageUrl = this.setLocationImage(this.selectedLocationId);
    this.ngZone.run(() => this.modal!.present());
  }
}
