import { TestBed } from '@angular/core/testing';

import { AlertsService } from './alerts.service';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { MOCK_MESSAGE_CREATE, MOCK_HEROES_LIST } from '../../assets/mocks/mocks';

describe('AlertsService', () => {
  let service: AlertsService;
  let translate: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    translate = jasmine.createSpyObj('TranslateService', ['setDefaultLang', 'use', 'instant']);
    translate.instant.and.callFake((key: string) => key);

    TestBed.configureTestingModule({
      providers: [
        AlertsService,
        { provide: TranslateService, useValue: translate },
      ],
    });
    service = TestBed.inject(AlertsService);
  });


  it('should return true when swal confirms deletion', (done) => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as any));

    service.questionModal(MOCK_HEROES_LIST[0]).subscribe((result) => {
      expect(result).toBeTrue();
      expect(Swal.fire).toHaveBeenCalled();
      done();
    });
  });


  it('should return false when swal cancels deletion', (done) => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: false } as any));

    service.questionModal(MOCK_HEROES_LIST[0]).subscribe((result) => {
      expect(result).toBeFalse();
      expect(Swal.fire).toHaveBeenCalled();
      done();
    });
  });


  it('should return true when swal confirms success', (done) => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as any));

    service.success(MOCK_MESSAGE_CREATE).subscribe((result) => {
      expect(result).toBeTrue();
      expect(Swal.fire).toHaveBeenCalled();
      done();
    });
  });


  it('should return false when swal cancels success', (done) => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: false } as any));

    service.success(MOCK_MESSAGE_CREATE).subscribe((result) => {
      expect(result).toBeFalse();
      expect(Swal.fire).toHaveBeenCalled();
      done();
    });
  });


  it('should show error swal', () => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({} as any));

    service.error();
    expect(Swal.fire).toHaveBeenCalled();
  });
});
