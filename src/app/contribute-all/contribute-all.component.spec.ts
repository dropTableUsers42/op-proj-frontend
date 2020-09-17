import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributeAllComponent } from './contribute-all.component';

describe('ContributeAllComponent', () => {
  let component: ContributeAllComponent;
  let fixture: ComponentFixture<ContributeAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributeAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributeAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
