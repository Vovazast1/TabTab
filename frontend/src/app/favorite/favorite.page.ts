import { Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/ApiService';
import { Favorite, storageKeys } from '../data';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss']
})
export class FavoritePage implements OnInit {
  favorites: Favorite[] = [];

    public imageUrl: String = '';
  public address: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    const userId = Number(localStorage.getItem(storageKeys.userId));
    this.apiService.getFavorites(userId).subscribe({
      next: favorites => {
        this.favorites = favorites;

        favorites.forEach(favorite => {
          console.log('GOT A FAVORITE!');
          console.log(favorite.image);
          console.log(favorite.address);
          this.setLocationImage(favorite.image);
          this.findAddress(favorite.address);
        });
      }
    });
  }

  setLocationImage(image: string) {
    this.imageUrl = image;
    return this.imageUrl;
  }

  findAddress(locationName: string) {
    this.address = locationName;
    return this.address;
  }

}
