import { Component, OnInit, inject } from '@angular/core';

import { ApiService } from '../providers/ApiService';
import { SocketService } from '../components/SocketService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-chat',
  templateUrl: './location-chat.page.html',
  styleUrls: ['./location-chat.page.scss']
})
export class LocationChatPage implements OnInit {
  public readonly SocketService = inject(SocketService);
  room: string = '';
  username: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {}

  checkForLogin(event: Event): void {
    event.preventDefault();

    this.router.navigate(['pages/chat']);
  }
}
