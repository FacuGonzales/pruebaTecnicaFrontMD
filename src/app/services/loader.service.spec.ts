import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';
import { take } from 'rxjs';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService],
    });
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should set loader state to true when viewLoader is called', (done) => {
    service.viewLoader();
    service.loaderState$.subscribe(state => {
      expect(state).toBeTrue();
      done();
    });
  });


  it('should set loader state to false when disabledLoader is called', (done) => {
    service.loaderState$.pipe(take(1)).subscribe(state => {
      expect(state).toBeFalse();
      done();
    });
    service.disabledLoader();
  });


  it('should emit false by default', (done) => {
    service.loaderState$.subscribe(state => {
      expect(state).toBeFalse();
      done();
    });
  });


  it('should emit true then false when viewLoader and disabledLoader are called', (done) => {
    const states: boolean[] = [];
    service.viewLoader();
    service.loaderState$.subscribe(state => {
      states.push(state);
      if (states.length === 2) {
        expect(states).toEqual([true, false]);
        done();
      }
    });
    service.disabledLoader();
  });

});
