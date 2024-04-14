import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../providers/ApiService';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterPageForm } from './register.form';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterPage implements OnInit {
  form?: FormGroup;
  currentDate!: string;
  registerForm?: RegisterPageForm;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
    // private apiService: ApiService
  ) {}

  register() {
    // const email = this.form?.get('email')?.value;
    // const password = this.form?.get('password')?.value;
    // this.apiService.register(email, password).subscribe({
    //   next: () => this.router.navigate(['activity']),
    //   error: () => console.error('Failed to load page.')
    // });
  }

  goToLogin() {
    this.router.navigate(['pages/login']);
    this.router.navigate(['pages/login']);
  }

  private createForm() {
    this.registerForm = new RegisterPageForm(this.formBuilder);
  }

  ngOnInit() {
    this.createForm();
  }
}
