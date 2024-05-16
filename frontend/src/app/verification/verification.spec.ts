import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerificationPage } from './verification';
import { ApiService } from '../providers/ApiService';
import { Router } from '@angular/router';
import { ToastService } from '../providers/ToastService';
import { of } from 'rxjs';

describe('VerificationPage', () => {
  let component: VerificationPage;
  let fixture: ComponentFixture<VerificationPage>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;

  beforeEach(() => {
    const apiServiceSpyObj = jasmine.createSpyObj('ApiService', ['getVerificationByUserId']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const toastServiceSpyObj = jasmine.createSpyObj('ToastService', ['showToast']);

    TestBed.configureTestingModule({
      declarations: [VerificationPage],
      providers: [
        { provide: ApiService, useValue: apiServiceSpyObj },
        { provide: Router, useValue: routerSpyObj },
        { provide: ToastService, useValue: toastServiceSpyObj }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VerificationPage);
    component = fixture.componentInstance;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toastServiceSpy = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to activity page if verification is successful', () => {
    const mockUserId = 1;
    apiServiceSpy.getVerificationByUserId.and.returnValue(of(true));
    spyOn(localStorage, 'getItem').and.returnValue(String(mockUserId));

    component.checkVerification();

    expect(apiServiceSpy.getVerificationByUserId).toHaveBeenCalledWith(mockUserId);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pages/activity']);
    expect(toastServiceSpy.showToast).not.toHaveBeenCalled();
  });

  it('should show toast if verification is not successful', () => {
    const mockUserId = 1;
    apiServiceSpy.getVerificationByUserId.and.returnValue(of(false));
    spyOn(localStorage, 'getItem').and.returnValue(String(mockUserId));

    component.checkVerification();

    expect(apiServiceSpy.getVerificationByUserId).toHaveBeenCalledWith(mockUserId);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(toastServiceSpy.showToast).toHaveBeenCalledWith('Verify your email!');
  });
});
