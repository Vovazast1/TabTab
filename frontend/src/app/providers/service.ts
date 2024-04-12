import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginPageModule } from '../login/login.module';

@Injectable()
export class ApiService {
  public authAPI = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) {
  }

  login(usernameOrEmail: string, password: string): Observable<any> {
    return this.http.post<any>(this.authAPI + "/login", {usernameOrEmail, password});
  }

  register(usernameOrEmail: string, password: string): Observable<any> {
    return this.http.post<any>(this.authAPI + "/register", {usernameOrEmail, password});
  }
}