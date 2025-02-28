import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroFormFormatService } from '../../services/hero-form-format.service';
import { of } from 'rxjs';
import { MOCK_HEROES_LIST } from '../../../assets/mocks/mocks';

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


  it('should call save', () => {
    const spy = spyOn(heroFormatData, 'formatHero').and.callThrough();
    const spy1 = spyOn(component.saveForm, 'emit');

    component.save();
    expect(spy).toHaveBeenCalled();
    expect(spy1).toHaveBeenCalled();
  });
});
