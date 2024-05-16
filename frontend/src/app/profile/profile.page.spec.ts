// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ProfilePage } from './profile.page';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { RouterTestingModule } from '@angular/router/testing';
// import { of } from 'rxjs';
// import { User } from '../data';
// import { ApiService } from '../providers/ApiService';
// import { ToastService } from '../providers/ToastService';
// import { ActivityService } from '../components/activity.service';
// import Avatar from '../data/Avatar';

// describe('ProfilePage', () => {
//   let component: ProfilePage;
//   let fixture: ComponentFixture<ProfilePage>;
//   let apiServiceSpy: jasmine.SpyObj<ApiService>;
//   let toastServiceSpy: jasmine.SpyObj<ToastService>;
//   let activityServiceSpy: jasmine.SpyObj<ActivityService>;

//   beforeEach(async () => {
//     const apiServiceSpyObj = jasmine.createSpyObj('ApiService', [
//       'getUser',
//       'changeAvatar',
//       'changeUsername',
//       'changePassword',
//       'deleteUser',
//       'deleteFavorites'
//     ]);
//     const toastServiceSpyObj = jasmine.createSpyObj('ToastService', ['showToast']);
//     const activityServiceSpyObj = jasmine.createSpyObj('ActivityService', ['currentActivity$']);

//     await TestBed.configureTestingModule({
//       declarations: [ProfilePage],
//       imports: [ReactiveFormsModule, RouterTestingModule],
//       providers: [
//         FormBuilder,
//         { provide: ApiService, useValue: apiServiceSpyObj },
//         { provide: ToastService, useValue: toastServiceSpyObj },
//         { provide: ActivityService, useValue: activityServiceSpyObj }
//       ]
//     }).compileComponents();

//     apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
//     toastServiceSpy = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
//     activityServiceSpy = TestBed.inject(ActivityService) as jasmine.SpyObj<ActivityService>;
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ProfilePage);
//     component = fixture.componentInstance;
//   });

//   it('should create', () => {
//     // Mocking user data
//     const mockUser: User = { userId: 1, username: 'testUser', avatar: Avatar.Avatar1 };
//     apiServiceSpy.getUser.and.returnValue(of(mockUser));

//     // Triggering ngOnInit
//     fixture.detectChanges();

//     expect(apiServiceSpy.getUser).toHaveBeenCalled();
//     expect(component.user).toEqual(mockUser);
//     expect(component.userAvatar).toEqual(component.getAvatarSrc(mockUser.avatar));
//     expect(component.username).toEqual(mockUser.username);
//   });
// });
