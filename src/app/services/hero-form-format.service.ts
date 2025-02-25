import { Injectable } from '@angular/core';
import { LocalstorageDataService } from './localstorage-data.service';
import { SuperHero } from '../models/super-hero-model';
import { Images } from '../models/images-model';

@Injectable({
  providedIn: 'root'
})
export class HeroFormFormatService {

  constructor(private localStorage: LocalstorageDataService) { }

  public getIdOfHero(): number {
    let superHeroes: SuperHero[] = this.localStorage.getItem('heroes') || [];
    let lastHero: SuperHero = superHeroes[superHeroes.length - 1];
    return lastHero ? lastHero.id + 1 : 1;
  }

  public formatHero(form: any, images?: Images): SuperHero {
    return {
      id: form.id || this.getIdOfHero(),
      name: this.capitalize(form.name),
      appearance: {
        gender: this.capitalize(form.gender),
        height: form.height,
        weight: form.weight,
        race: form.race,
      },
      biography: {
        alignment: this.capitalize(form.alignment),
        firstAppearance: this.capitalize(form.firstAppearance),
        fullName: this.capitalize(form.fullName),
        placeOfBirth: this.capitalize(form.placeOfBirth),
        publisher: form.publisher
      },
      powerstats: {
        combat: form.combat,
        durability: form.durability,
        intelligence: form.intelligence,
        power: form.power,
        speed: form.speed,
        strength: form.strength
      },
      images : {
        xs: images?.xs ?? '',
        sm: images?.sm ?? '',
        md: images?.md ?? '',
        lg: images?.lg ?? '',
      }
    }
  }

  public capitalize(text: string): string {
    return text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : '';
  }
}
