import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RegisterPage } from './register';
import { ApiService } from '../providers/ApiService';
import { Observable } from 'rxjs';

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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [IonicModule.forRoot(), AppRoutingModule],
      providers: [{ provide: ApiService, useValue: mockApiService }]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    router = TestBed.get(Router);

    component = fixture.componentInstance;
  }));

  it('should go to activity page on register', () => {
    spyOn(router, 'navigate');
    //mockApiService.register().and.returnValue(null);
    component.register();

    expect(router.navigate).toHaveBeenCalledWith(['activity']);
  });
});
