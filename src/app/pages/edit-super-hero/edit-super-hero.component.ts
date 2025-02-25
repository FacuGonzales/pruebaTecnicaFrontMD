import { Component, OnDestroy } from '@angular/core';
import { HeaderBarComponent } from '../../shared/header-bar/header-bar.component';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../shared/form/form.component';
import { SuperHero } from '../../models/super-hero-model';
import { ShDataService } from '../../services/sh-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AlertsService } from '../../services/alerts.service';
import { AlertMessage } from '../../models/alert-message';
import { ROUTES_CONST } from '../../constants/routes.constants';

@Component({
  selector: 'app-edit-super-hero',
  standalone: true,
  imports: [CommonModule, HeaderBarComponent, FormComponent],
  templateUrl: './edit-super-hero.component.html',
  styleUrl: './edit-super-hero.component.scss'
})
export class EditSuperHeroComponent implements OnDestroy {
  public id: number = 0;
  public heroEdit!: SuperHero;
  public title: string = '';
  public isNewHero: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(private superHeroData: ShDataService,
              private router: Router,
              private activateRoute: ActivatedRoute,
              private alert: AlertsService) {
    this.activateRoute.url.subscribe(url => {
      let _route = url.join('/');
      this.isNewHero = _route === ROUTES_CONST.CREATE;
      this.title = this.isNewHero ? 'EDIT.CREATE' : 'EDIT.UPDATE';
    })

    this.activateRoute.params.subscribe((params: any) => {
      this.id = +params['id'];
      if(this.id) this.getHeroById();
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getHeroById(): void {
    this.superHeroData.getHeroById(this.id).pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data) => {
        this.heroEdit = data;
      }
    })
  }


  public cancel(back: boolean): void {
    this.router.navigate([ROUTES_CONST.HOME]);
  }

  public save(hero: SuperHero): void {
    let message: AlertMessage = {
      title: 'ALERTS.MESSAGES.OK.TITLE',
      text: this.isNewHero
      ? 'ALERTS.MESSAGES.OK.TEXT_CREATE'
      : 'ALERTS.MESSAGES.OK.TEXT_UPDATE'
    }

    if(this.isNewHero) {
      this.superHeroData.createHero(hero);
    } else {
      this.superHeroData.updateDataHero(hero);
    }

    this.confirm(message);
  }

  public confirm(message: AlertMessage): void {
    this.alert.success(message).pipe(takeUntil(this.destroy$))
    .subscribe((resp: boolean) => {
      if(resp) {
        this.router.navigate([ROUTES_CONST.HOME]);
      }
    })
  }
}
