import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityType, User, storageKeys } from '../data';
import * as L from 'leaflet';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../providers/ApiService';
import { ToastService } from '../providers/ToastService';
import { ProfilePageForm } from './profile.page.form';
import { getFormString, getUserId } from '../utils';
import Avatar from '../data/Avatar';
import { ActivityService } from '../components/activity.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  form?: FormGroup;
  currentActivity: ActivityType | null = null;
  map!: L.Map;
  user: User | null = null;
  userAvatar: string = '';
  username: string | undefined = '';

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
    private activityService: ActivityService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.form = new ProfilePageForm(this.formBuilder).createForm();

    this.apiService.getUser(getUserId()).subscribe({
      next: user => {
        this.user = user;
        this.userAvatar = this.getAvatarSrc(this.user.avatar);
        this.username = this.getUsername();
      }
    });

    this.activityService.currentActivity$.subscribe(activity => {
      this.currentActivity = activity;
    });
  }

  goToLocations() {
    if (this.map) {
      this.map.remove();
    }
    this.router.navigate(['pages/locations', this.currentActivity]);
  }

  changeAvatar(avatar: Avatar) {
    this.apiService.changeAvatar(getUserId(), avatar).subscribe({
      next: () => {
        this.toastService.showToast('Avatar successfully changed!');
        this.userAvatar = this.getAvatarSrc(avatar);
      },
      error: () => this.toastService.showToast('Avatar matches the previous!')
    });
  }

  changeUsername() {
    const username = getFormString(this.form, 'username');

    this.apiService.changeUsername(getUserId(), username).subscribe({
      next: () => {
        this.toastService.showToast('Username changed!');
        this.username = username;
        localStorage.setItem(storageKeys.sub, username);
      },
      error: () => this.toastService.showToast('Username matches the previous or already taken!')
    });
  }

  changePassword() {
    const password = this.form?.get('password')?.value;
    const confirmPassword = this.form?.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.toastService.showToast('Entered passwords don`t match');
      return;
    }

    this.apiService.changePassword(getUserId(), password).subscribe({
      next: () => this.toastService.showToast('Password changed!'),
      error: () => this.toastService.showToast('Password matches the previous!')
    });
  }

  deleteAccount() {
    this.deleteFavorites(getUserId());
    this.apiService.deleteUser(getUserId()).subscribe({
      next: () => this.router.navigate(['pages/login']),
      error: () => this.toastService.showToast('CANNOT DELETE!')
    });
  }

  deleteFavorites(userId: number) {
    this.apiService.deleteFavorites(userId).subscribe();
  }

  getUsername() {
    return this.user?.username;
  }

  getAvatarSrc(avatar: Avatar) {
    return this.avatars.find(a => a.id === avatar)?.src ?? '';
  }

  getAvatars() {
    return this.avatars;
  }
}
