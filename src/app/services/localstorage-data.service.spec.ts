import { TestBed } from '@angular/core/testing';

import { LocalstorageDataService } from './localstorage-data.service';
import { MOCK_SUPER_HEROES } from '../../assets/mocks/mocks';

describe('LocalstorageDataService', () => {
  let service: LocalstorageDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalstorageDataService],
    });
    service = TestBed.inject(LocalstorageDataService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should validate key when key is provided', () => {
    expect(service.validateKey('heroes')).toBeTrue();
  });

  it('should not validate key when key is not provided', () => {
    expect(service.validateKey('')).toBeFalse();
  });


  it('should get item from local storage when key is valid', () => {
    localStorage.setItem('heroes', JSON.stringify(MOCK_SUPER_HEROES));
    const heroes = service.getItem('heroes');
    expect(heroes).toEqual(MOCK_SUPER_HEROES);
  });


  it('should return empty array when item is not found', () => {
    const heroes = service.getItem('nonexistentKey');
    expect(heroes).toEqual([]);
  });


  it('should throw error when key is invalid', () => {
    expect(() => service.getItem('')).toThrowError('Falta la clave');
  });


  it('should set item in local storage when key and value are valid', () => {
    service.setItem('heroes', MOCK_SUPER_HEROES);
    const heroes = JSON.parse(localStorage.getItem('heroes') ?? '');
    expect(heroes).toEqual(MOCK_SUPER_HEROES);
  });


  it('should not set item when key is invalid', () => {
    service.setItem('', MOCK_SUPER_HEROES);
    expect(localStorage.getItem('heroes')).toBeNull();
  });


  it('should not set item when value is invalid', () => {
    service.setItem('heroes', null);
    expect(localStorage.getItem('heroes')).toBeNull();
  });


  it('should remove item from local storage when key is valid', () => {
    localStorage.setItem('heroes', JSON.stringify(MOCK_SUPER_HEROES));
    service.removeItem('heroes');
    expect(localStorage.getItem('heroes')).toBeNull();
  });


  it('should throw error when key is invalid', () => {
    expect(() => service.removeItem('')).toThrowError('Falta la clave');
  });


  it('should clear all items from local storage', () => {
    localStorage.setItem('heroes', JSON.stringify(MOCK_SUPER_HEROES));
    localStorage.setItem('otherKey', JSON.stringify({ data: 'test' }));
    service.clearLocalStorage();
    expect(localStorage.getItem('heroes')).toBeNull();
    expect(localStorage.getItem('otherKey')).toBeNull();
  });
});
