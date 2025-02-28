import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { SuperHero } from '../../models/super-hero-model';
import { HeroFormFormatService } from '../../services/hero-form-format.service';
import { TextUppercaseTransformDirective } from '../../directives/text-uppercase-transform.directive';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            TranslateModule,
            MatInputModule,
            MatFormFieldModule,
            MatButtonModule,
            TextUppercaseTransformDirective
          ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnChanges {
  public form!: FormGroup;

  @Input() data!: SuperHero;
  @Output() cancelForm = new EventEmitter();
  @Output() saveForm = new EventEmitter();

  private paternOnlyNumbers = /^[0-9,\'\.]*$/;
  private paternOnlyLetters = /^[a-zA-Z\s]*$/;

  constructor(private fb: FormBuilder, private translate: TranslateService, private heroFormat: HeroFormFormatService) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');

    this.initForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if(changes['data'] && this.data) {
      this.completForm();
    }
  }

  public initForm(): void {
    this.form = this.fb.group({
      id: [ null ],
      name: [ '', Validators.required],
      gender: ['',[ Validators.required, Validators.pattern(this.paternOnlyLetters)]],
      height: ['', [ Validators.required,  Validators.pattern(this.paternOnlyNumbers) ]],
      weight: ['', Validators.required],
      race: ['', [ Validators.required, Validators.pattern(this.paternOnlyLetters) ]],
      alignment: ['', [ Validators.required, Validators.pattern(this.paternOnlyLetters) ]],
      firstAppearance: [''],
      fullName: ['', [ Validators.required, Validators.pattern(this.paternOnlyLetters) ]],
      placeOfBirth: [''],
      publisher: [''],
      combat: ['',[ Validators.required, Validators.min(1)]],
      durability: ['',[ Validators.required, Validators.min(1)]],
      intelligence: ['',[ Validators.required, Validators.min(1)]],
      power: ['',[ Validators.required, Validators.min(1)]],
      speed: ['',[ Validators.required, Validators.min(1)]],
      strength: ['',[ Validators.required, Validators.min(1)]],
    })
  }

  public completForm(): void {
    this.form.setValue({
      id: this.data.id,
      name: this.data.name,
      gender: this.data.appearance.gender,
      height: this.data.appearance.height,
      weight: this.data.appearance.weight,
      race: this.data.appearance.race,
      alignment: this.data.biography.alignment,
      firstAppearance: this.data.biography.firstAppearance,
      fullName: this.data.biography.fullName,
      placeOfBirth: this.data.biography.placeOfBirth,
      publisher: this.data.biography.publisher,
      combat: this.data.powerstats.combat,
      durability: this.data.powerstats.durability,
      intelligence: this.data.powerstats.intelligence,
      power: this.data.powerstats.power,
      speed: this.data.powerstats.speed,
      strength: this.data.powerstats.strength,
    })
  }

  public cancel(): void {
    this.cancelForm.emit(true);
  }

  public save(): void {
    let hero: SuperHero = this.heroFormat.formatHero(this.form.value, this.data?.images)
    this.saveForm.emit(hero);
  }
}
