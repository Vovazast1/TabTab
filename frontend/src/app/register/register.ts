import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  register() {
    this.router.navigate(['activity']);
  }
}
