import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityType, User, storageKeys } from '../data';
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
  user: User | null = null;
  userAvatar: string = '';

  private avatars = [
    { id: Avatar.Avatar1, src: 'assets/avatar/Avatar1.png' },
    { id: Avatar.Avatar2, src: 'assets/avatar/Avatar2.png' },
    { id: Avatar.Avatar3, src: 'assets/avatar/Avatar3.png' },
    { id: Avatar.Avatar4, src: 'assets/avatar/Avatar4.png' },
    { id: Avatar.Avatar5, src: 'assets/avatar/Avatar5.png' }
  ];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.form = new ProfilePageForm(this.formBuilder).createForm();

    this.apiService.getUser(Number(localStorage.getItem(storageKeys.userId))).subscribe({
      next: user => {
        this.user = user;
        this.userAvatar = this.getAvatarSrc(this.user.avatar);
      }
    });
  }

  goToLocations() {
    if (this.map) {
      this.map.remove();
    }
    this.router.navigate(['pages/locations', this.currentActivity]);
  }

  changeAvatar(avatar: Avatar) {
    const userId = Number(localStorage.getItem(storageKeys.userId));
    this.apiService.changeAvatar(userId, avatar).subscribe({
      next: () => {
        this.toastService.showToast('Avatar successfully changed!');
        this.userAvatar = this.getAvatarSrc(avatar);
      },
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

  getAvatarSrc(avatar: Avatar) {
    return this.avatars.find(a => a.id === avatar)?.src ?? '';
  }

  getAvatars() {
    return this.avatars;
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
