import { Component, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header-bar',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './header-bar.component.html',
  styleUrl: './header-bar.component.scss'
})
export class HeaderBarComponent {
  @Input() title: string = '';

  constructor(public translate: TranslateService) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }
}
