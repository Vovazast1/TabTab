import { Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/ApiService';
import { ActivityType, Favorite, UserId } from '../data';
import { ActivityService } from '../components/activity.service';
import * as L from 'leaflet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss']
})
export class FavoritePage implements OnInit {
  favorites: Favorite[] = [];
  map!: L.Map;
  currentActivity: ActivityType | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activityService: ActivityService
  ) {}

  ngOnInit() {
    this.activityService.currentActivity$.subscribe(activity => {
      this.currentActivity = activity;
    });
    this.loadFavorites();
  }

  loadFavorites() {
    this.apiService.getFavorites(UserId).subscribe({
      next: favorites => {
        this.favorites = favorites;
      }
    });
  }

  deleteFavorite(favoriteId: number) {
    this.apiService.deleteFavorite(favoriteId).subscribe();
  }

  goToLocations() {
    if (this.map) {
      this.map.remove();
    }
    this.router.navigate(['pages/locations', this.currentActivity]);
  }
}
