import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferOverlayComponent } from './refer-overlay.component';

describe('ReferOverlayComponent', () => {
  let component: ReferOverlayComponent;
  let fixture: ComponentFixture<ReferOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
