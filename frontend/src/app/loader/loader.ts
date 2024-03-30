import { AppRoutingModule } from '../app-routing.module';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.html',
  styleUrls: ['./loader.scss'],
})
export class Loader implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(async () => {
      this.router.navigate(['/pages/login']);
    }, 1000);
  }
}
