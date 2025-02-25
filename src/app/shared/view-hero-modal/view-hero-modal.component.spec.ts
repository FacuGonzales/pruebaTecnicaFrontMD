import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHeroModalComponent } from './view-hero-modal.component';

describe('ViewHeroModalComponent', () => {
  let component: ViewHeroModalComponent;
  let fixture: ComponentFixture<ViewHeroModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewHeroModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHeroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
