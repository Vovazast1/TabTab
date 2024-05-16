import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../providers/ApiService';
import { ToastService } from '../providers/ToastService';
import { Component } from '@angular/core';
import { MockVerificationPage } from './mock.verification.page'; // Import MockVerificationPage
import { VerificationPage } from '../verification/verification';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage, MockVerificationPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
      ],
      providers: [
        ApiService,
        ToastService,
        { provide: VerificationPage, useClass: MockVerificationPage } // Override VerificationPage with MockVerificationPage
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
  }));

  it('should create form on init', () => {
    component.ngOnInit();

    expect(component.form).toBeDefined();
  });
});
