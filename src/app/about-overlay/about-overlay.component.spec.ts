import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutOverlayComponent } from './about-overlay.component';

describe('AboutOverlayComponent', () => {
  let component: AboutOverlayComponent;
  let fixture: ComponentFixture<AboutOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
