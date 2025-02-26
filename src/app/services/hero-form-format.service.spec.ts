import { TestBed } from '@angular/core/testing';

import { HeroFormFormatService } from './hero-form-format.service';
import { LocalstorageDataService } from './localstorage-data.service';
import { MOCK_FORM, MOCK_HERO, MOCK_IMAGES, MOCK_SUPER_HEROES } from '../../assets/mocks/mocks';

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
    localStorageData.getItem.and.returnValue(MOCK_SUPER_HEROES);
    expect(service.getIdOfHero()).toBe(201);
  });


  it('should return 1 when localstorage is empty', () => {
    localStorageData.getItem.and.returnValue([]);
    expect(service.getIdOfHero()).toBe(1);
  });


  it('should format hero from form data', () => {
    const form = MOCK_FORM
    const images = MOCK_IMAGES

    localStorageData.getItem.and.returnValue(MOCK_SUPER_HEROES);

    const formattedHero = service.formatHero(form, images);

    expect(formattedHero).toEqual(MOCK_HERO);
  });

  it('should format hero from form data with existing id', () => {
    const form = { id: 10, ...MOCK_FORM };
    const formattedHero = service.formatHero(form);

    expect(formattedHero.id).toBe(10);
  });

  it('should format hero from form data with empty images', () => {
    const form = MOCK_FORM;
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
