import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationsPage } from './locations.page';
import { HttpClientModule } from '@angular/common/http';
import { LocationsPageRoutingModule } from './locations-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

describe('LocationsPage', () => {
  let component: LocationsPage;
  let fixture: ComponentFixture<LocationsPage>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationsPage],
      imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot(),
        LocationsPageRoutingModule,
        HttpClientModule,
        AppRoutingModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(LocationsPage);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
