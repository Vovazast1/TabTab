import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivityType, Location, DTOResponse, Message } from '../data';

@Injectable({ providedIn: 'root' })
export class ApiService {
  public authAPI = 'http://localhost:8080/api/v1/auth';
  public locationAPI = 'http://localhost:8080/api/v1/locations';
  public messageAPI = 'http://localhost:8080/api/v1/messages';
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

  getMessages(room: string) {
    return this.http.get<Message[]>(this.messageAPI + `/${room}`);
  }
}
