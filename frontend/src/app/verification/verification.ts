import { Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/ApiService';
import { FormGroup } from '@angular/forms';
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
    const thisUserId = Number(localStorage.getItem(storageKeys.userId));

    this.apiService.getVerificationByUserId(thisUserId).subscribe({
      next: () => this.router.navigate(['/pages/activity']),
      error: () => this.toastService.showToast('Verify your email!')
    });
  }
}
