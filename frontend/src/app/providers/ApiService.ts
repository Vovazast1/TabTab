import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivityType, Favorite, Location, LocationDto, DTOResponse } from '../data';

@Injectable({ providedIn: 'root' })
export class ApiService {
  public API = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  login(usernameOrEmail: string, password: string): Observable<DTOResponse> {
    return this.http.post<DTOResponse>(this.API + '/auth/login', {
      usernameOrEmail,
      password
    });
  }

  register(email: string, username: string, birthday: Date, password: string): Observable<string> {
    return this.http.post(
      this.API + '/auth/register',
      {
        email,
        username,
        birthday,
        password
      },
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text'
      }
    );
  }

  getLocationsByActivity(activity: ActivityType): Observable<Location[]> {
    return this.http.get<Location[]>(this.API + `/location?activity=${activity}`);
  }

  getLocationDto(locationId: number): Observable<LocationDto> {
    return this.http.get<LocationDto>(this.API + `/location/${locationId}`);
  }

  getFavorites(userId: number): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(this.API + `/favorite/${userId}`);
  }

  addToFavorite(userId: number, locationId: number) {
    return this.http.post(this.API + '/favorite', {
      userId,
      locationId
    });
  }

  isFavorite(userId: number, locationId: number): Observable<boolean> {
    return this.http.get<boolean>(this.API + `/favorite?userId=${userId}&locationId=${locationId}`);
  }

  getVerificationByUserId(userId: number): Observable<boolean> {
    return this.http.get<boolean>(this.API + `/user/${userId}/verification`);
  }

  changeAvatar(userId: number, avatar: number) {
    return this.http.post(this.API + `/user/${userId}/changeAvatar?avatar=${avatar}`, {});
  }

  changeUsername(userId: number, username: string) {
    return this.http.post(this.API + `/user/${userId}/changeUsername?username=${username}`, {});
  }

  changePassword(userId: number, password: string) {
    return this.http.post(this.API + `/user/${userId}/changePassword?password=${password}`, {});
  }
}
