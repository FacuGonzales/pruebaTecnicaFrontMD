import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHeroModalComponent } from './view-hero-modal.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

class MatDialogRefStub {
  close() {
    return of(true); // Simula el comportamiento de cierre del modal
  }

  afterClosed() {
    return of(true); // Simula el observable que se emite cuando se cierra el modal
  }
}

describe('ViewHeroModalComponent', () => {
  let component: ViewHeroModalComponent;
  let fixture: ComponentFixture<ViewHeroModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewHeroModalComponent, MatDialogModule, HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useClass: MatDialogRefStub },
        { provide: MatDialog, useValue: { open: () => ({}) } },
        TranslateService
      ],
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
