import { TestBed } from '@angular/core/testing';

import { HeroFormFormatService } from './hero-form-format.service';

describe('HeroFormFormatService', () => {
  let service: HeroFormFormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroFormFormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
