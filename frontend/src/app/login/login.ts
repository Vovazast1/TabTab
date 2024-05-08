import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './login.form';
import { ApiService } from '../providers/ApiService';
import { DTOResponse, storageKeys } from '../data';
import { ToastService } from '../providers/ToastService';
import { VerificationPage } from '../verification/verification';
import { getFormDate, getFormString } from '../utils';

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
    private verificationPage: VerificationPage,
    private toastService: ToastService
  ) {}

  handleLoginClick() {
    const email = getFormString(this.form, 'email');
    const password = getFormString(this.form, 'password');
    this.login(email, password);
  }

  login(email: string, password: string) {
    this.apiService.login(email, password).subscribe({
      next: (response: DTOResponse) => {
        const decodedToken = atob(response.accessToken.split('.')[1]);
        const claims = JSON.parse(decodedToken);
        localStorage.setItem(storageKeys.userId, claims.userId);
        localStorage.setItem(storageKeys.token, response.accessToken);

        this.router.navigate(['/pages/verification']);
        this.verificationPage.checkVerification();
      },
      error: () => {
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
