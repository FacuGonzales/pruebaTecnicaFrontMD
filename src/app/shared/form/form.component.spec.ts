import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroFormFormatService } from '../../services/hero-form-format.service';
import { of } from 'rxjs';
import { MOCK_HEROES_LIST, MOCK_HEROES_NOT_DATA } from '../../../assets/mocks/mocks';

class MOCK_FORMAT_DATA {
  formatHero() {
    return of(MOCK_HEROES_LIST[0])
  }
}

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let heroFormatData: HeroFormFormatService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent, TranslateModule.forRoot(), BrowserAnimationsModule],
      declarations: [],
      providers: [
        { provide: HeroFormFormatService, useClass: MOCK_FORMAT_DATA },
        TranslateService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    heroFormatData = TestBed.inject(HeroFormFormatService);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should emit cancelForm event', () => {
    const spy1 = spyOn(component.cancelForm, 'emit');

    component.cancel();
    expect(spy1).toHaveBeenCalled();
  });


  it('should complet form', () => {
    const newData = { ...MOCK_HEROES_LIST[0], id: 1 };
    component.data = newData;

    const MOCK = {
      id: 1,
      name: 'A-bomb',
      alignment: 'Good',
      firstAppearance: 'Hulk vol 2 #2 (april, 2008) (as a-bomb)',
      fullName: 'Richard milhouse jones',
      placeOfBirth: 'Scarsdale, arizona',
      gender: 'Male',
      height: "6'8",
      weight: '980 lb',
      race: 'Human',
      publisher: 'Marvel Comics',
      combat: 64,
      durability: 80,
      intelligence: 38,
      power: 24,
      speed: 17,
      strength: 100
    }

    component.completForm();
    expect(component.form.value).toEqual(MOCK)
  });


  it('should complete the form but with incomplete data', () => {
    const newData = { ...MOCK_HEROES_NOT_DATA, id: 1 };
    component.data = newData;

    const MOCK = {
      id: 1,
      name: 'A-bomb',
      alignment: '',
      firstAppearance: '',
      fullName: '',
      placeOfBirth: '',
      gender: '',
      height: '',
      weight: '',
      race: '',
      publisher: '',
      combat: 0,
      durability: 0,
      intelligence: 0,
      power: 0,
      speed: 0,
      strength: 0
    }

    component.completForm();
    expect(component.form.value).toEqual(MOCK)
  });


  it('should call save', () => {
    const spy = spyOn(heroFormatData, 'formatHero').and.callThrough();
    const spy1 = spyOn(component.saveForm, 'emit');

    component.save();
    expect(spy).toHaveBeenCalled();
    expect(spy1).toHaveBeenCalled();
  });
});
