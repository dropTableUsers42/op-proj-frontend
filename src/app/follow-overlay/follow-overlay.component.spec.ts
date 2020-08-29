import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowOverlayComponent } from './follow-overlay.component';

describe('FollowOverlayComponent', () => {
  let component: FollowOverlayComponent;
  let fixture: ComponentFixture<FollowOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
