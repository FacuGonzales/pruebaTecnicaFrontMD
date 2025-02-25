import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogTitle, MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ShDataService } from '../../services/sh-data.service';
import { Subject, takeUntil } from 'rxjs';
import { SuperHero } from '../../models/super-hero-model';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-view-hero-modal',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatDialogContent, MatDialogTitle, MatDialogActions, MatButtonModule],
  templateUrl: './view-hero-modal.component.html',
  styleUrl: './view-hero-modal.component.scss'
})
export class ViewHeroModalComponent implements OnInit, OnDestroy {
  public hero?: SuperHero;
   private destroy$ = new Subject<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: number,
              private dialogRef: MatDialogRef<ViewHeroModalComponent>,
              private superHeroData: ShDataService,
              public translate: TranslateService
            ) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  public ngOnInit(): void {
    this.getHeroesById(this.data);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getHeroesById(id: number) {
    this.superHeroData.getHeroById(id).pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data) => {
        this.hero = data;
      }
    })
  }

  public close(): void {
    return this.dialogRef.close(true);
  }
}
