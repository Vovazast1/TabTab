import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IonicModule],
})
export class AppComponent {
  public appPages = [
    { title: 'Loader', url: '/loader/loader'},
    { title: 'LoginPage', url: '/login-page/login-page'},
    { title: 'RegisterPage', url: '/register-page/register-page'},
  ];
  constructor() {}
}
