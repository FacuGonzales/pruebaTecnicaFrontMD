import { TestBed } from '@angular/core/testing';

import { ShDataService } from './sh-data.service';

describe('ShDataService', () => {
  let service: ShDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
