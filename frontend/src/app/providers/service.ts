import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Tab2Service {
  public API = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getMessage(): Observable<any> {
      return this.http.get(this.API + '/goodbye');
  }
}