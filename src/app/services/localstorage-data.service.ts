import { Injectable } from '@angular/core';
import { SuperHero } from '../models/super-hero-model';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageDataService {

  constructor() { }

  public validateKey( key: string ): boolean {
    return !!key;
  }

  public getItem( key: string ): SuperHero[] {
    if(!this.validateKey(key)) throw new Error("Falta la clave");

    let value = JSON.parse(localStorage.getItem(key) ?? '[]');

    return value;
  }

  public setItem( key: string, value: any ): void {
    if(!this.validateKey(key) || !value) return;

    let valueString = JSON.stringify(value);

    localStorage.setItem(key, valueString);
  }

  public removeItem( key: string): void {
    if(!this.validateKey(key)) throw new Error("Falta la clave");

    localStorage.removeItem(key);
  }

  public clearLocalStorage(): void {
    localStorage.clear();
  }

}
