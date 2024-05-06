import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './login.form';
import { ApiService } from '../providers/ApiService';
import { DTOResponse, storageKeys } from '../data';
import { ToastService } from '../providers/ToastService';

@Component({
  selector: 'app-login',
  templateUrl: 'login.html',
  styleUrls: ['login.scss']
})
export class LoginPage implements OnInit {
  form?: FormGroup;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {}

  login() {
    const email = this.form?.get('email')?.value;
    const password = this.form?.get('password')?.value;

    this.apiService.login(email, password).subscribe({
      next: (response: DTOResponse) => {
        if (response) {
          const decodedToken = atob(response.accessToken.split('.')[1]);
          const claims = JSON.parse(decodedToken);
          localStorage.setItem(storageKeys.userId, claims.userId);
          localStorage.setItem(storageKeys.token, response.accessToken);
          this.router.navigate(['pages/activity']);
          console.log('Token is saved!.');
        } else {
          console.error('Token not found in response.');
        }
      },
      error: (error: any) => {
        console.error('Error occurred during login:', error);
        this.toastService.showToast('Wrong email or password');
      }
    });
  }

  goToRegister() {
    this.router.navigate(['pages/register']);
  }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }
}
