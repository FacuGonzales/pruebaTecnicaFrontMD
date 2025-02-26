import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ViewHeroModalComponent } from '../shared/view-hero-modal/view-hero-modal.component';
import { of } from 'rxjs';

describe('ModalService', () => {
  let service: ModalService;
  let dialog: jasmine.SpyObj<MatDialog>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ViewHeroModalComponent>>;

  beforeEach(() => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      providers: [
        ModalService,
        { provide: MatDialog, useValue: dialog },
      ],
    });

    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should open the view hero modal with correct parameters', () => {
    const id = 123;
    dialog.open.and.returnValue(dialogRef);
    dialogRef.afterClosed.and.returnValue(of(true));

    service.openViewHeroModal(id);

    expect(dialog.open).toHaveBeenCalledWith(ViewHeroModalComponent, {
      width: '1500px',
      autoFocus: false,
      data: id,
    });
  });


  it('should return the afterClosed observable from the dialog ref', (done) => {
    const id = 1;
    dialog.open.and.returnValue(dialogRef);
    dialogRef.afterClosed.and.returnValue(of(true));

    service.openViewHeroModal(id).subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  });
});
