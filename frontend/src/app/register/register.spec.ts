import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RegisterPage } from './register';
import { ApiService } from '../providers/ApiService';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPageModule } from './register.module';

let mockApiService = jasmine.createSpyObj('ApiService', {
  login: new Observable(observer => {
    observer.next({
      accessToken: 'test',
      tokenType: 'test'
    });
  }),
  register: new Observable(observer => {
    observer.next(null);
  })
});

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router;
  let page: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, RegisterPageModule],
      providers: [{ provide: ApiService, useValue: mockApiService }]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    router = TestBed.get(Router);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  }));

  it('should go to activity page on register', () => {
    fixture.detectChanges();

    const spy = spyOn(router, 'navigate');
    spy.calls.reset();
    //mockApiService.register().and.returnValue(null);

    // component.registerForm?.getForm().get('username')?.setValue('anyUsername');
    // component.registerForm?.getForm().get('email')?.setValue('any@email.com');
    // component.registerForm?.getForm().get('password')?.setValue('anyPassword');
    // component.registerForm?.getForm().get('confirmPassword')?.setValue('anyPassword');
    // component.registerForm?.getForm().get('birthday')?.setValue('date');
    // page.querySelector('ion-button').click('register()');

    component.register();

    expect(router.navigate).toHaveBeenCalledWith(['/pages/activity']);
  });

  it('should create register form on page init', () => {
    fixture.detectChanges();

    expect(component.registerForm).not.toBeUndefined();
  });

  // it('should not be allowed to register with form invalid', () => {
  //   fixture.detectChanges();
  //   const spy = spyOn(router, 'navigate');
  //   spy.calls.reset();
  //   page.querySelector('ion-button').click();
  //   expect(spy).toHaveBeenCalledTimes(0);
  // });
});
