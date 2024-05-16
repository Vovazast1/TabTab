import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RegisterPage } from './register';
import { ApiService } from '../providers/ApiService';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPageModule } from './register.module';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router;
  let page: any;

  // Mock ApiService
  let mockApiService: jasmine.SpyObj<ApiService>;

  beforeEach(waitForAsync(() => {
    // Create a spy object for ApiService methods
    mockApiService = jasmine.createSpyObj('ApiService', ['login', 'register']);

    TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, RegisterPageModule],
      providers: [
        { provide: ApiService, useValue: mockApiService } // Provide the mock ApiService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    router = TestBed.inject(Router);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  }));

  // it('should go to verification page on register', () => {
  //   fixture.detectChanges();

  //   const spy = spyOn(router, 'navigate').and.stub(); // Stub the navigate method
  //   // Stub the login method to return an observable with the correct response format
  //   mockApiService.login.and.returnValue(
  //     new Observable(observer => {
  //       observer.next({
  //         accessToken: 'test',
  //         tokenType: 'test'
  //       });
  //     })
  //   );

  //   component.register();

  //   expect(spy).toHaveBeenCalledWith(['/pages/verification']);
  // });

  it('should create register form on page init', () => {
    fixture.detectChanges();

    expect(component.registerForm).not.toBeUndefined();
  });
});
