import { TestBed } from '@angular/core/testing';

import { ShDataService } from './sh-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ShDataService', () => {
  let service: ShDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ShDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
