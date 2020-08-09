import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OppDetailComponent } from './opp-detail.component';

describe('OppDetailComponent', () => {
  let component: OppDetailComponent;
  let fixture: ComponentFixture<OppDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OppDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OppDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
