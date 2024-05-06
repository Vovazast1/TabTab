import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerificationPage } from './verification';

describe('VerificationPage', () => {
  let component: VerificationPage;
  let fixture: ComponentFixture<VerificationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
