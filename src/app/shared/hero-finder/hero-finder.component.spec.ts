import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroFinderComponent } from './hero-finder.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HeroFinderComponent', () => {
  let component: HeroFinderComponent;
  let fixture: ComponentFixture<HeroFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), BrowserAnimationsModule, HeroFinderComponent],
      declarations: [],
      providers: [ TranslateService ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
