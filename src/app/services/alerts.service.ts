import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { SuperHero } from '../models/super-hero-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(public translate: TranslateService
                ) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  public questionModal(hero: SuperHero): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      Swal.fire({
        title: this.translate.instant('ALERTS.MESSAGES.DELETE.TITLE'),
        text:  `${this.translate.instant('ALERTS.MESSAGES.DELETE.QUESTION')} ${hero.name}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: this.translate.instant('ALERTS.MESSAGES.BTN.CONFIRM'),
      }).then((result) => {
        if (result.isConfirmed) {
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      });
    })
  }

  public success(): void {
    Swal.fire({
      title: this.translate.instant('ALERTS.MESSAGES.DELETE.SUCCESS.OK'),
      text: this.translate.instant('ALERTS.MESSAGES.DELETE.SUCCESS.MESSAGE'),
      icon: "success"
    });
  }

  public error(): void {
    Swal.fire({
      title: this.translate.instant('ALERTS.MESSAGES.ERROR.TITLE'),
      text: this.translate.instant('ALERTS.MESSAGES.ERROR.TEXT'),
      icon: "error"
    });
  }
}
