import { TestBed } from '@angular/core/testing';

import { WaitlistServiceService } from './waitlist-service.service';

describe('WaitlistServiceService', () => {
  let service: WaitlistServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaitlistServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
