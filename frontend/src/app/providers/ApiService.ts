import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivityType, Location, DTOResponse } from '../data';

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
    return this.http.get<Location[]>(this.API + `/locations?activity=${activity}`);
  }

  addToFavorite(userId: number, locationId: number) {
    return this.http.post(this.API + '/favorites', {
      userId,
      locationId
    });
  }

  getVerificationByUserId(userId: number): Observable<Boolean> {
    return this.http.get<Boolean>(this.API + `/verification?user=${userId}`);
  }
}
