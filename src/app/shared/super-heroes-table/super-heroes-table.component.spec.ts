import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperHeroesTableComponent } from './super-heroes-table.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SuperHeroesTableComponent', () => {
  let component: SuperHeroesTableComponent;
  let fixture: ComponentFixture<SuperHeroesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperHeroesTableComponent, TranslateModule.forRoot(), BrowserAnimationsModule],
      declarations: [],
      providers: [ TranslateService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperHeroesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
