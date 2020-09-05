import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OppDetailCommentComponent } from './opp-detail-comment.component';

describe('OppDetailCommentComponent', () => {
  let component: OppDetailCommentComponent;
  let fixture: ComponentFixture<OppDetailCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OppDetailCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OppDetailCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
