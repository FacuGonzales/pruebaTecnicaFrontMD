import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ShDataService } from './sh-data.service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { LocalstorageDataService } from './localstorage-data.service';
import { LoaderService } from './loader.service';
import { API_CONFIG } from '../api.config';
import { MOCK_CREATE_HERO, MOCK_HEROES_LIST } from '../../assets/mocks/mocks';
import { provideHttpClient } from '@angular/common/http';

describe('ShDataService', () => {
  let service: ShDataService;
  let httpTestingController: HttpTestingController;
  let localStorageData: jasmine.SpyObj<LocalstorageDataService>;
  let loaderData: jasmine.SpyObj<LoaderService>;

  beforeEach(() => {
    localStorageData = jasmine.createSpyObj('LocalstorageDataService', ['getItem', 'setItem']);
    loaderData = jasmine.createSpyObj('LoaderService', ['viewLoader', 'disabledLoader']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: LocalstorageDataService, useValue: localStorageData },
        { provide: LoaderService, useValue: loaderData },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ShDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  xit('should get heroes from localstorage when available', fakeAsync(() => {
    localStorageData.getItem.and.returnValue(MOCK_HEROES_LIST);

    service.getHeroes().subscribe(heroes => {
      expect(heroes).toEqual(MOCK_HEROES_LIST);
      expect(localStorageData.getItem).toHaveBeenCalledWith('heroes');
      tick(5000);
    });
    tick();
  }));


  it('should get heroes from api when local storage is empty', (done) => {
    localStorageData.getItem.and.returnValue([]);

    service.getHeroes().subscribe(heroes => {
      expect(heroes).toEqual(MOCK_HEROES_LIST);
      expect(localStorageData.getItem).toHaveBeenCalledWith('heroes');
      expect(localStorageData.setItem).toHaveBeenCalledWith('heroes', MOCK_HEROES_LIST);
      done();
    });

    const req = httpTestingController.expectOne(`${API_CONFIG.baseUrl.apiUrl}/all.json`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_HEROES_LIST);
  });


  it('should get hero by id from api when not in localstorage', (done) => {
    localStorageData.getItem.and.returnValue([MOCK_HEROES_LIST[1]]);

    service.getHeroById(1).subscribe(hero => {
      expect(hero).toEqual(MOCK_HEROES_LIST[0]);
      expect(localStorageData.getItem).toHaveBeenCalledWith('heroes');
      expect(localStorageData.setItem).toHaveBeenCalled();
      done();
    });

    const req = httpTestingController.expectOne(`${API_CONFIG.baseUrl.apiUrl}/id/1.json`);
    expect(req.request.method).toBe('GET');
    req.flush([MOCK_HEROES_LIST[0]]);
  });


  it('should throw error when hero is not found in api', (done) => {
    localStorageData.getItem.and.returnValue([MOCK_HEROES_LIST[1]]);

    service.getHeroById(3).subscribe({
      error: (error) => {
        expect(error.message).toBe('No se encontro el heroe con el id ingresado.');
        done();
      },
    });

    const req = httpTestingController.expectOne(`${API_CONFIG.baseUrl.apiUrl}/id/3.json`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });


  it('should create a new hero and update localstorage', (done) => {
    localStorageData.getItem.and.returnValue(MOCK_HEROES_LIST);

    service.createHero(MOCK_CREATE_HERO).subscribe(result => {
      expect(result).toBeTrue();
      expect(localStorageData.setItem).toHaveBeenCalled();
      done();
    });
  });


  it('should update an existing hero and update localstorage', (done) => {
    localStorageData.getItem.and.returnValue(MOCK_HEROES_LIST);

    service.updateDataHero(MOCK_HEROES_LIST[0]).subscribe(result => {
      expect(result).toBeTrue();
      expect(localStorageData.setItem).toHaveBeenCalled();
      done();
    });
  });


  it('should delete a hero and update localstorage', (done) => {
    localStorageData.getItem.and.returnValue(MOCK_HEROES_LIST);

    service.deleteHero(1).subscribe(result => {
      expect(result).toBeTrue();
      expect(localStorageData.setItem).toHaveBeenCalled();
      done();
    });
  });


  it('should filter heroes by name', (done) => {
    localStorageData.getItem.and.returnValue(MOCK_HEROES_LIST);

    service.filterByName('a-b').subscribe(heroes => {
      expect(heroes).toEqual([MOCK_HEROES_LIST[0]]);
      done();
    });
  });


  afterEach(() => {
    httpTestingController.verify();
  });

});
