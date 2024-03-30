import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './login.form';

@Component({
  selector: 'app-login',
  templateUrl: 'login.html',
  styleUrls: ['login.scss'],
})
export class LoginPage implements OnInit {
  form?: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  login() {
    this.router.navigate(['activity']);
  }

  register() {
    this.router.navigate(['register']);
  }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }
}
