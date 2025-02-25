import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { TextUppercaseTransformDirective } from '../../directives/text-uppercase-transform.directive';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hero-finder',
  standalone: true,
  imports: [ CommonModule,
             FormsModule,
             TranslateModule,
             MatFormFieldModule,
             MatInputModule,
             MatButtonModule,
             MatIconModule,
             TextUppercaseTransformDirective
            ],
  templateUrl: './hero-finder.component.html',
  styleUrl: './hero-finder.component.scss'
})
export class HeroFinderComponent {
  @Output() emitName = new EventEmitter();

  public valueFilter: string = '';

  constructor(public translate: TranslateService) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  public filtered(): void {
    this.emitName.emit(this.valueFilter);
  }

  public cleanFilter(): void {
    this.valueFilter = '';
    this.emitName.emit('');
  }
}
