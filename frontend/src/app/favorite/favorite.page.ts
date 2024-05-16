import {Component, inject, OnInit} from '@angular/core';
import { ApiService } from '../providers/ApiService';
import { ActivityType, Favorite, storageKeys } from '../data';
import { ActivityService } from '../components/activity.service';
import * as L from 'leaflet';
import { Router } from '@angular/router';
import { getUserId } from '../utils';
import {FavoriteService} from "./favorite.service";


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss']
})
export class FavoritePage implements OnInit {
  map!: L.Map;
  currentActivity: ActivityType | null = null;

  public readonly favoritesService = inject(FavoriteService);

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
    this.apiService.getFavorites(getUserId())
      .subscribe(favorites => this.favoritesService.updateFavorites(favorites));
  }

  deleteFavorite(favoriteId: number) {
    this.apiService.deleteFavorite(favoriteId)
      .subscribe(() => this.favoritesService.deleteFavorites(favoriteId));
  }

  goToLocations() {
    if (this.map) {
      this.map.remove();
    }
    this.router.navigate(['pages/locations', this.currentActivity]);
  }

   goToChat(locationId: number) {
    this.router.navigate(['pages/chat', locationId]);
  }
}
