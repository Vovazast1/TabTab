import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DTOResponse } from '../data/DTOResponse';
import { ActivityType, Location } from '../data';

@Injectable({ providedIn: 'root' })
export class ApiService {
  public authAPI = 'http://localhost:8080/api/v1/auth';
  public locationAPI = 'http://localhost:8080/api/v1/locations';

  constructor(private http: HttpClient) {}

  login(usernameOrEmail: string, password: string): Observable<DTOResponse> {
    return this.http.post<DTOResponse>(this.authAPI + '/login', {
      usernameOrEmail,
      password
    });
  }

  register(email: string, username: string, birthday: Date, password: string): Observable<string> {
    return this.http.post(
      this.authAPI + '/register',
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
    return this.http.get<Location[]>(this.locationAPI + `?activity=${activity}`);
  }
}
