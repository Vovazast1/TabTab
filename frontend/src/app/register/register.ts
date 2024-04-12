import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../providers/service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterPage implements OnInit {
  form?: FormGroup;

  constructor(
    private router: Router,
    //private apiService : ApiService
  ) {}

  register() {
    // this.apiService.register(this.form?.get('email')?.value, this.form?.get('password')?.value).subscribe(
    //   {
    //     next:() => this.router.navigate(['pages/activity']),
    //     error:() => console.error("Failed to load page.")
    //   }
    // )
  }

  goToLogin() {
    this.router.navigate(['pages/login'])
  }

  ngOnInit() {}
}
