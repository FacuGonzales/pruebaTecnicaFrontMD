import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSuperHeroComponent } from './edit-super-hero.component';

describe('EditSuperHeroComponent', () => {
  let component: EditSuperHeroComponent;
  let fixture: ComponentFixture<EditSuperHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSuperHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSuperHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
