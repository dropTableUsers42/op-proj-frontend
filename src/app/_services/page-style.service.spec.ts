import { TestBed } from '@angular/core/testing';

import { PageStyleService } from './page-style.service';

describe('PageStyleService', () => {
  let service: PageStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
