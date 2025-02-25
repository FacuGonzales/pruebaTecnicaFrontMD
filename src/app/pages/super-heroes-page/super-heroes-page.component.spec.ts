import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperHeroesPageComponent } from './super-heroes-page.component';

describe('SuperHeroesPageComponent', () => {
  let component: SuperHeroesPageComponent;
  let fixture: ComponentFixture<SuperHeroesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperHeroesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperHeroesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
