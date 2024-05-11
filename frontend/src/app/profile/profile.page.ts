import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityType, storageKeys } from '../data';
import * as L from 'leaflet';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../providers/ApiService';
import { ToastService } from '../providers/ToastService';
import { ProfilePageForm } from './profile.page.form';
import { getFormString, getFormNumber } from '../utils';
import Avatar from '../data/Avatar';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

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

  private Avatars = {
    [Avatar.Avatar1]: 'assets/avatar/Avatar1.png',
    [Avatar.Avatar2]: 'assets/avatar/Avatar2.png',
    [Avatar.Avatar3]: 'assets/avatar/Avatar3.png',
    [Avatar.Avatar4]: 'assets/avatar/Avatar4.png',
    [Avatar.Avatar5]: 'assets/avatar/Avatar5.png'
  };

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

    await this.router.navigate(['pages/locations', newActivity]);
    if (this.map) {

      this.map.remove();
    }
    await this.router.navigate(['pages/locations', newActivity]);
  }

  changeAvatar() {
    const avatar = getFormNumber(this.form, 'avatar');

    const userId = Number(localStorage.getItem(storageKeys.userId));
    this.apiService.changeAvatar(userId, avatar).subscribe({
      next: () => this.toastService.showToast('Avatar successfully changed!'),
      error: () => this.toastService.showToast('Avatar matches the previous!')
    });
  }

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

  getUsername() {
    return localStorage.getItem(storageKeys.sub);
  }

  getAllAvatars() {
    return Object.values(this.Avatars);
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
 
}
