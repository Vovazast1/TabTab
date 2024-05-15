import { Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/ApiService';
import { Router } from '@angular/router';
import { storageKeys } from '../data';
import { ToastService } from '../providers/ToastService';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.html',
  styleUrls: ['./verification.scss']
})
export class VerificationPage implements OnInit {
  userId: number | null = null;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {}

  checkVerification() {
    this.apiService.getVerificationByUserId(Number(localStorage.getItem(storageKeys.userId))).subscribe({
      next: value => {
        if (value) {
          this.router.navigate(['/pages/activity']);
        } else {
          this.toastService.showToast('Verify your email!');
        }
      }
    });
  }
}
