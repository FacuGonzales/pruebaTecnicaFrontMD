import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewHeroModalComponent } from '../shared/view-hero-modal/view-hero-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: MatDialog) { }

  public openViewHeroModal(id: number) {
    const modalInstance = this.modalService.open(ViewHeroModalComponent, {
      width: '1500px',
      autoFocus: false,
      data: id,
    })

    return modalInstance.afterClosed();
  }
}
