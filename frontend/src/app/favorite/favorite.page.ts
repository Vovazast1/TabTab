import { Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/ApiService';
import { Favorite, storageKeys } from '../data';
import { LocationsPage } from '../locations/locations.page';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss']
})
export class FavoritePage implements OnInit {
  favorites: Favorite[] = [];

  constructor(
    private apiService: ApiService,
    private locationspage: LocationsPage
  ) {}

  ngOnInit() {
    const userId = Number(localStorage.getItem(storageKeys.userId));
    this.apiService.getFavorites(userId).subscribe({
      next: favorites => {
        this.favorites = favorites;

        favorites.forEach(favorite => {
          console.log('GOT A FAVORITE!');
          console.log(favorite.favoriteId);
          console.log(favorite.userId);
          console.log(favorite.locationId);
          console.log(this.locationspage.setLocationImage(favorite.locationId));
          console.log(this.locationspage.setLocationName(favorite.locationId));
        });
      }
    });
  }
}
