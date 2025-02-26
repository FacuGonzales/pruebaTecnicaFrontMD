import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSuperHeroComponent } from './edit-super-hero.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class ActivatedRouteStub {
  // Simula el observable `url`
  url = of(['edit', '1']); // Aquí, por ejemplo, 'edit' sería la ruta, y '1' sería el id del héroe

  // Simula el observable `params`
  params = of({ id: '1' }); // Simula que el parámetro 'id' tiene el valor '1'
}

describe('EditSuperHeroComponent', () => {
  let component: EditSuperHeroComponent;
  let fixture: ComponentFixture<EditSuperHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSuperHeroComponent, HttpClientTestingModule, TranslateModule.forRoot(), BrowserAnimationsModule],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        TranslateService
      ],
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
