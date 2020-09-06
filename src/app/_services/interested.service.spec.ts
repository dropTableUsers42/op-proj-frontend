import { TestBed } from '@angular/core/testing';

import { InterestedService } from './interested.service';

describe('InterestedService', () => {
  let service: InterestedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterestedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
