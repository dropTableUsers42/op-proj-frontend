import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpOverlayComponent } from './dp-overlay.component';

describe('DpOverlayComponent', () => {
  let component: DpOverlayComponent;
  let fixture: ComponentFixture<DpOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
