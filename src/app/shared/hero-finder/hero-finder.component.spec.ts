import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroFinderComponent } from './hero-finder.component';

describe('HeroFinderComponent', () => {
  let component: HeroFinderComponent;
  let fixture: ComponentFixture<HeroFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroFinderComponent]
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
