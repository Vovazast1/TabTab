import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../providers/ApiService';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterPageForm } from './register.form';
import { format, parseISO } from 'date-fns';
import { concatMap, switchMap, take } from 'rxjs';
import { ToastService } from '../providers/ToastService';
import { LoginPage } from '../login/login';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterPage implements OnInit {
  form!: FormGroup;
  registerForm?: RegisterPageForm;
  modes = ['date'];
  selectedMode = 'date';
  showPicker = false;
  dateValue = format(new Date(), 'yyyy-MM-dd');
  formattedString = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private loginPage: LoginPage,
    private toastService: ToastService
  ) {}

  setToday() {
    this.formattedString = format(parseISO(format(new Date(), 'yyyy-MM-dd')), ' MMM d, yyyy');
  }

  dateChange(value: any) {
    this.dateValue = value;
    this.formattedString = format(parseISO(value), ' MMM d, yyyy');
  }

  register() {
    this.registerForm?.getForm().markAllAsTouched();

    const email = this.form?.get('email')?.value;
    const username = this.form?.get('username')?.value;
    const birthday = this.form?.get('birthday')?.value;
    const password = this.form?.get('password')?.value;
    this.apiService
      .register(email, username, birthday, password)
      // .pipe(
      //   take(1),
      //   switchMap(() => {
      //     return this.apiService.login(email, password);
      //   })
      // )
      .subscribe({
        next: () => {
          this.router.navigate(['/pages/verification']);
          this.loginPage.login(email, password);
        },
        error: err => {
          this.toastService.showToast('Username or email is already taken!');
          console.error(err);
        }
      });
  }

  goToLogin() {
    this.router.navigate(['pages/login']);
  }

  private createForm() {
    this.registerForm = new RegisterPageForm(this.formBuilder);
    return this.registerForm.getForm();
  }

  ngOnInit() {
    this.form = this.createForm();
  }
}
