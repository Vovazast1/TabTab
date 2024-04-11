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
  public next: any;
  form?: FormGroup;

  constructor(
    private router: Router,
    private apiService : ApiService,
    private formBuilder: FormBuilder,
  ) {}

  login() {
    this.apiService.login(this.form?.get('email')?.value, this.form?.get('password')?.value).subscribe(
      {
        next:() => console.log("Success!"),
        error:() => console.error("Incorrect login or password.")
      }
    )
  }

  register() {
    this.apiService.register(this.form?.get('email')?.value, this.form?.get('password')?.value).subscribe(
      {
        next:() => console.log("Success!"),
        error:() => console.error("Failed to load page.")
      }
    )
  }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }
}
