import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './login.form';
import { ApiService } from '../providers/service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.html',
  styleUrls: ['login.scss'],
})
export class LoginPage implements OnInit {
  public property: any;
  form?: FormGroup;

  constructor(
    private router: Router,
    private apiService : ApiService,
    private formBuilder: FormBuilder,
  ) {}

  login() {
    this.apiService.login().subscribe(
      property => { this.property = property; },
      error => { console.error('Failed to load page: ' + error) }
    )
  }

  register() {
    this.apiService.register().subscribe(
      property => { this.property = property; },
      error => { console.error('Failed to load page: ' + error) }
    )
  }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }
}
