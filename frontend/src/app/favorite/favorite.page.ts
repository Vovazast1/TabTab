import { Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/ApiService';
import { Favorite, UserId } from '../data';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss']
})
export class FavoritePage implements OnInit {
  favorites: Favorite[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
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
}
