import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OppsWishlistv2Component } from './opps-wishlistv2.component';

describe('OppsWishlistv2Component', () => {
  let component: OppsWishlistv2Component;
  let fixture: ComponentFixture<OppsWishlistv2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OppsWishlistv2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OppsWishlistv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
