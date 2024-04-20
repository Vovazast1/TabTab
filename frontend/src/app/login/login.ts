import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './login.form';
import { ApiService } from '../providers/ApiService';

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
    private formBuilder: FormBuilder
  ) {}

  login() {
    const email = this.form?.get('email')?.value;
    const password = this.form?.get('password')?.value;

    this.apiService.login(email, password).subscribe({
      next: value => {
        console.log(value);
        this.router.navigate(['pages/activity']);
      },
      error: () => console.error('Incorrect login or password.')
    });
  }

  goToRegister() {
    this.router.navigate(['pages/register']);
  }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }
}
