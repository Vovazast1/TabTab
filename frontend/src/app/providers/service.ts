import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginPageModule } from '../login/login.module';

@Injectable()
export class ApiService {
  public API = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  login(): Observable<any> {
    return this.http.post<any>(this.API + "/login", "");
  }

  register(): Observable<any> {
    return this.http.get(this.API + '/api/auth/singup');
  }
}