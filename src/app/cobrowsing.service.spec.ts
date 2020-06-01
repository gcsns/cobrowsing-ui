import { TestBed } from '@angular/core/testing';

import { CobrowsingService } from './cobrowsing.service';

describe('CobrowsingService', () => {
  let service: CobrowsingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CobrowsingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
