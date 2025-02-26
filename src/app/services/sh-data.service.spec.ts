import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ShDataService } from './sh-data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocalstorageDataService } from './localstorage-data.service';
import { LoaderService } from './loader.service';
import { API_CONFIG } from '../api.config';
import { MOCK_CREATE_HERO, MOCK_NO_EXISTE_HERO, MOCK_SUPER_HEROES, MOCK_UPDATE_HERO } from '../../assets/mocks/mocks';

describe('ShDataService', () => {
  let service: ShDataService;
  let httpTestingController: HttpTestingController;
  let localStorageData: jasmine.SpyObj<LocalstorageDataService>;
  let loaderData: jasmine.SpyObj<LoaderService>;

  beforeEach(() => {
    localStorageData = jasmine.createSpyObj('LocalstorageDataService', ['getItem', 'setItem']);
    loaderData = jasmine.createSpyObj('LoaderService', ['viewLoader', 'disabledLoader']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: LocalstorageDataService, useValue: localStorageData },
        { provide: LoaderService, useValue: loaderData },
      ],
    });

    service = TestBed.inject(ShDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should get heroes from localstorage when available', fakeAsync(() => {
    localStorageData.getItem.and.returnValue(MOCK_SUPER_HEROES);

    service.getHeroes().subscribe(heroes => {
      expect(heroes).toEqual(MOCK_SUPER_HEROES);
      expect(localStorageData.getItem).toHaveBeenCalledWith('heroes');
      expect(loaderData.viewLoader).toHaveBeenCalled();
      tick(1500);
      expect(loaderData.disabledLoader).toHaveBeenCalled();
    });
    tick();
  }));


  it('should get heroes from api when local storage is empty', (done) => {
    localStorageData.getItem.and.returnValue([]);

    service.getHeroes().subscribe(heroes => {
      expect(heroes).toEqual(MOCK_SUPER_HEROES);
      expect(localStorageData.getItem).toHaveBeenCalledWith('heroes');
      expect(localStorageData.setItem).toHaveBeenCalledWith('heroes', MOCK_SUPER_HEROES);
      expect(loaderData.viewLoader).toHaveBeenCalled();
      expect(loaderData.disabledLoader).toHaveBeenCalled();
      done();
    });

    const req = httpTestingController.expectOne(`${API_CONFIG.baseUrl}/all.json`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_SUPER_HEROES);
  });


  it('should get hero by id from localstorage when available', (done) => {
    localStorageData.getItem.and.returnValue(MOCK_SUPER_HEROES);

    service.getHeroById(70).subscribe(hero => {
      expect(hero).toEqual(MOCK_SUPER_HEROES[0]);
      expect(localStorageData.getItem).toHaveBeenCalledWith('heroes');
      done();
    });
  });


  it('should get hero by id from api when not in localstorage', (done) => {
    localStorageData.getItem.and.returnValue([MOCK_SUPER_HEROES[1]]);

    service.getHeroById(1).subscribe(hero => {
      expect(hero).toEqual(MOCK_SUPER_HEROES[0]);
      expect(localStorageData.getItem).toHaveBeenCalledWith('heroes');
      expect(localStorageData.setItem).toHaveBeenCalled();
      done();
    });

    const req = httpTestingController.expectOne(`${API_CONFIG.baseUrl}/id/1.json`);
    expect(req.request.method).toBe('GET');
    req.flush([MOCK_SUPER_HEROES[0]]);
  });


  it('should throw error when hero is not found in api', (done) => {
    localStorageData.getItem.and.returnValue([MOCK_SUPER_HEROES[1]]);

    service.getHeroById(3).subscribe({
      error: (error) => {
        expect(error.message).toBe('No se encontro el heroe con el id ingresado.');
        done();
      },
    });

    const req = httpTestingController.expectOne(`${API_CONFIG.baseUrl}/id/3.json`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });


  it('should create a new hero and update localstorage', (done) => {
    localStorageData.getItem.and.returnValue(MOCK_SUPER_HEROES);

    service.createHero(MOCK_CREATE_HERO).subscribe(result => {
      expect(result).toBeTrue();
      expect(localStorageData.setItem).toHaveBeenCalled();
      done();
    });
  });


  it('should update an existing hero and update localstorage', (done) => {
    localStorageData.getItem.and.returnValue(MOCK_SUPER_HEROES);

    service.updateDataHero(MOCK_UPDATE_HERO).subscribe(result => {
      expect(result).toBeTrue();
      expect(localStorageData.setItem).toHaveBeenCalled();
      done();
    });
  });


  it('should throw error when hero to update is not found', () => {
    localStorageData.getItem.and.returnValue(MOCK_SUPER_HEROES);

    expect(() => service.updateDataHero(MOCK_NO_EXISTE_HERO)).toThrowError('No se encontro el heroe solicitado');
  });


  it('should delete a hero and update localstorage', (done) => {
    localStorageData.getItem.and.returnValue(MOCK_SUPER_HEROES);

    service.deleteHero(1).subscribe(result => {
      expect(result).toBeTrue();
      expect(localStorageData.setItem).toHaveBeenCalled();
      done();
    });
  });


  it('should filter heroes by name', (done) => {
    localStorageData.getItem.and.returnValue(MOCK_SUPER_HEROES);

    service.filterByName('bat').subscribe(heroes => {
      expect(heroes).toEqual([MOCK_SUPER_HEROES[0]]);
      done();
    });
  });


  afterEach(() => {
    httpTestingController.verify();
  });

});
