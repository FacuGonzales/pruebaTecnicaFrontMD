import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ShDataService } from '../../services/sh-data.service';
import { SuperHeroesTableComponent } from '../../shared/super-heroes-table/super-heroes-table.component';
import { HeaderBarComponent } from '../../shared/header-bar/header-bar.component';
import { SuperHero } from '../../models/super-hero-model';
import { HeroFinderComponent } from '../../shared/hero-finder/hero-finder.component';
import { ModalService } from '../../services/modal.service';
import { AlertsService } from '../../services/alerts.service';
import { AlertMessage } from '../../models/alert-message';
import { ROUTES_CONST } from '../../constants/routes.constants';

@Component({
  selector: 'app-super-heroes-page',
  standalone: true,
  imports: [CommonModule,
            TranslateModule,
            MatButtonModule,
            MatIconModule,
            HeaderBarComponent,
            SuperHeroesTableComponent,
            HeroFinderComponent
          ],
  templateUrl: './super-heroes-page.component.html',
  styleUrl: './super-heroes-page.component.scss'
})
export class SuperHeroesPageComponent implements OnInit, OnDestroy {
  public superHeroesList: any[] = [];
  public valueFilter: string = '';
  private destroy$ = new Subject<void>();

  constructor(private superHeroData: ShDataService,
              private modalData: ModalService,
              private router: Router,
              public translate: TranslateService,
              private alert: AlertsService
              ) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getHeroes(): void {
    this.superHeroData.getHeroes()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data) => {
        this.superHeroesList = data;
      }
    })
  }

  public selectedHero(hero: SuperHero): void {
    this.modalData.openViewHeroModal(hero.id)
    .pipe(takeUntil(this.destroy$))
    .subscribe(value => value);
  }

  public filteredByName(value: string): void {
    if(value.length) {
      this.valueFilter = value;
      this.superHeroData.filterByName(value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: SuperHero[]) => {
          this.superHeroesList = data;
        }
      })
    } else {
      this.getHeroes();
    }
  }

  public creatHero(): void {
    this.router.navigate([ROUTES_CONST.CREATE]);
  }

  public editHero(hero: SuperHero): void {
    this.router.navigate([ROUTES_CONST.EDIT(hero.id)]);
  }

  public deleteHero(hero: SuperHero): void {
    this.alert.questionModal(hero)
    .pipe(takeUntil(this.destroy$))
    .subscribe((resp: boolean) => {
      if(resp) {
        this.confirmDelete(hero.id);
      }
    })
  }

  public confirmDelete(id: number) {
    this.superHeroData.deleteHero(id);

    let message: AlertMessage = {
      title: 'ALERTS.MESSAGES.DELETE.SUCCESS.OK',
      text: 'ALERTS.MESSAGES.DELETE.SUCCESS.MESSAGE'
    }

    this.alert.success(message).pipe(takeUntil(this.destroy$))
    .subscribe((resp: boolean) => {
      if(resp) {
        this.getHeroes()
      }
    })
  }
}
