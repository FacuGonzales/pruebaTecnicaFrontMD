import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroFinderComponent } from './hero-finder.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('HeroFinderComponent', () => {
  let component: HeroFinderComponent;
  let fixture: ComponentFixture<HeroFinderComponent>;
  let translate: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeroFinderComponent,
        TranslateModule.forRoot(),
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule
      ],
      declarations: [],
      providers: [ TranslateService ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroFinderComponent);
    component = fixture.componentInstance;
    translate = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize valueFilter to empty string', () => {
    expect(component.valueFilter).toBe('');
  });


  it('should set default language to Spanish', () => {
    expect(translate.getDefaultLang()).toBe('es');
    expect(translate.currentLang).toBe('es');
  });


  it('should emit the valueFilter when filtered is called', () => {
    const emitSpy = spyOn(component.emitName, 'emit');
    component.valueFilter = 'test';
    component.filtered();
    expect(emitSpy).toHaveBeenCalledWith('test');
  });


  it('should clear valueFilter and emit an empty string when cleanFilter is called', () => {
    const emitSpy = spyOn(component.emitName, 'emit');
    component.valueFilter = 'test';
    component.cleanFilter();
    expect(component.valueFilter).toBe('');
    expect(emitSpy).toHaveBeenCalledWith('');
  });


  it('should update valueFilter when input value changes', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'new value';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.valueFilter).toBe('new value');
  });


  it('should call cleanFilter when clean button is clicked', () => {
    component.valueFilter = 'test';
    fixture.detectChanges();
    const cleanButton: HTMLButtonElement = fixture.nativeElement.querySelector('.btn-clear');
    expect(cleanButton).toBeTruthy();
    const cleanFilterSpy = spyOn(component, 'cleanFilter');
    cleanButton.click();
    expect(cleanFilterSpy).toHaveBeenCalled();
  });
});
