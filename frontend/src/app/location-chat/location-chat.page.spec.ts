import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { LocationChatPage } from './location-chat.page';

describe('LocationChatPage', () => {
  let component: LocationChatPage;
  let fixture: ComponentFixture<LocationChatPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LocationChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
