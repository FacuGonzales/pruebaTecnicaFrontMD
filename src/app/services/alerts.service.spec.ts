import { TestBed } from '@angular/core/testing';

import { AlertsService } from './alerts.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('AlertsService', () => {
  let service: AlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [],
      providers: [ TranslateService]
    });
    service = TestBed.inject(AlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
