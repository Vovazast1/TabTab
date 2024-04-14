import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../providers/ApiService';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterPage implements OnInit {
  form?: FormGroup;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  register() {
    const email = this.form?.get('email')?.value;
    const password = this.form?.get('password')?.value;

    this.apiService.register(email, password).subscribe({
      next: () => this.router.navigate(['activity']),
      error: () => console.error('Failed to load page.')
    });
  }

  goToLogin() {
    this.router.navigate(['pages/login']);
  }

  ngOnInit() {}
}
