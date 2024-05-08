import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityType, storageKeys } from '../data';
import * as L from 'leaflet';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../providers/ApiService';
import { ToastService } from '../providers/ToastService';
import { ProfilePageForm } from './profile.page.form';
import { getFormString } from '../utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  form?: FormGroup;

  currentActivity?: ActivityType;
  map!: L.Map;
  public l: string = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.form = new ProfilePageForm(this.formBuilder).createForm();
  }

  async goToLocations() {
    const newActivity = this.currentActivity === ActivityType.Sport ? ActivityType.Intelligence : ActivityType.Sport;
    if (this.map) {
      this.map.remove();
    }
    await this.router.navigate(['pages/locations', newActivity]);
    window.location.reload();
  }

  // changeAvatar() {
  //   const avatar = this.form?.get('avatar')?.value;
  // }

  changeUsername() {
    const username = getFormString(this.form, 'username');

    const userId = Number(localStorage.getItem(storageKeys.userId));
    this.apiService.changeUsername(userId, username).subscribe({
      next: () => this.toastService.showToast('Username changed!'),
      error: () => this.toastService.showToast('Username matches the previous!')
    });
  }

  changePassword() {
    const password = this.form?.get('password')?.value;
    const confirmPassword = this.form?.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.toastService.showToast('Entered passwords don`t match');
      return;
    }

    const thisUserId = Number(localStorage.getItem(storageKeys.userId));
    this.apiService.changePassword(thisUserId, password).subscribe({
      next: () => this.toastService.showToast('Password changed!'),
      error: () => this.toastService.showToast('Password matches the previous!')
    });
  }
}
