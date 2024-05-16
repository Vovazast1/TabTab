import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Favorite} from "../data";

@Injectable({ providedIn: 'root' })
export class FavoriteService {

  private readonly favorites$ = new BehaviorSubject<Favorite[]>([]);

  public getFavorites$(): Observable<Favorite[]> {
    return this.favorites$.asObservable();
  }

  public updateFavorites(favorites: Favorite[]): void {
    this.favorites$.next(favorites);
  }

  public deleteFavorites(favoriteId: number): void {
    this.favorites$.next(this.favorites$.value.filter(favorite => favorite.favoriteId !== favoriteId));
  }

  public addFavorite(favorite: Favorite): void {
    const favorites = [...this.favorites$.value];
    favorites.push(favorite);
    this.favorites$.next(favorites)
  }

  public getByLocationId(locationId: number | null): Favorite | undefined {
    return this.favorites$.value.find((favorite: Favorite) => favorite.locationId === locationId);
  }
}
