import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitlistOverlayComponent } from './waitlist-overlay.component';

describe('WaitlistOverlayComponent', () => {
  let component: WaitlistOverlayComponent;
  let fixture: ComponentFixture<WaitlistOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitlistOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitlistOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
