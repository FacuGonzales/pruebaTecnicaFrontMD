import { TestBed } from '@angular/core/testing';

import { HeroFormFormatService } from './hero-form-format.service';
import { LocalstorageDataService } from './localstorage-data.service';
import { MOCK_FORM_DATA, MOCK_HEROES_LIST } from '../../assets/mocks/mocks';

describe('HeroFormFormatService', () => {
  let service: HeroFormFormatService;
  let localStorageData: jasmine.SpyObj<LocalstorageDataService>;

  beforeEach(() => {
    localStorageData = jasmine.createSpyObj('LocalstorageDataService', ['getItem']);

    TestBed.configureTestingModule({
      providers: [
        HeroFormFormatService,
        { provide: LocalstorageDataService, useValue: localStorageData },
      ],
    });
    service = TestBed.inject(HeroFormFormatService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return the next available id when heroes are in localstorage', () => {
    localStorageData.getItem.and.returnValue(MOCK_HEROES_LIST);

    expect(service.getIdOfHero()).toBe(MOCK_HEROES_LIST.length+1);
  });


  it('should return 1 when localstorage is empty', () => {
    localStorageData.getItem.and.returnValue([]);
    expect(service.getIdOfHero()).toBe(1);
  });


  it('should format hero from form data', () => {
    const form = MOCK_FORM_DATA
    const images = MOCK_HEROES_LIST[0].images

    localStorageData.getItem.and.returnValue(MOCK_HEROES_LIST);

    const formattedHero = service.formatHero(form, images);
    MOCK_HEROES_LIST[0].id = formattedHero.id;
    expect(formattedHero).toEqual(MOCK_HEROES_LIST[0]);
  });


  it('should format hero from form data with existing id', () => {
    const form = { id: 1, ...MOCK_FORM_DATA };
    const formattedHero = service.formatHero(form);

    expect(formattedHero.id).toBe(1);
  });


  it('should format hero from form data with empty images', () => {
    const form = MOCK_FORM_DATA;
    const formattedHero = service.formatHero(form);

    expect(formattedHero.images).toEqual({
      xs: '',
      sm: '',
      md: '',
      lg: '',
    });
  });


  it('should capitalize the first letter of a string', () => {
    expect(service.capitalize('wolverine')).toBe('Wolverine');
    expect(service.capitalize('bAtMaN')).toBe('Batman');
  });


  it('should return an empty string if input is empty', () => {
    expect(service.capitalize('')).toBe('');;
  });
});
