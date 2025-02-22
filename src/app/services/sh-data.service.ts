import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { SuperHero } from '../models/super-hero-model';
import { API_CONFIG } from '../api.config';
import { LocalstorageDataService } from './localstorage-data.service';

@Injectable({
  providedIn: 'root'
})
export class ShDataService {
  constructor(private http: HttpClient, private localstorageData: LocalstorageDataService) { }

  private getHeroesForApi(id?: number): Observable<SuperHero[]> {
    let route: string = id ? `${API_CONFIG.baseUrl}/id/${id}.json` : `${API_CONFIG.baseUrl}/all.json`;
    return this.http.get<SuperHero[]>(route);
  }

  private getHeroesForLocal(): SuperHero[] {
    return this.localstorageData.getItem('heroes');
  }

  public getHeroes(): Observable<SuperHero[]> {
    const heroesLocal: SuperHero[] = this.getHeroesForLocal();

    if(heroesLocal.length) {
      return new Observable((observer) => {
        observer.next(heroesLocal);
        observer.complete()
      });
    } else {
      return this.getHeroesForApi().pipe(
        tap((heroesOfApi) => {
          this.localstorageData.setItem('heroes', heroesOfApi);
        })
      )
    }
  }

  public getHeroById(id: number): Observable<SuperHero> {
    const heroesLocal: SuperHero[] = this.getHeroesForLocal();

    const heroSelected = heroesLocal.find(hero => hero.id === id);

    if(heroSelected) {
      return new Observable((observer) => {
        observer.next(heroSelected);
        observer.complete();
      })
    } else {
      return this.getHeroesForApi(id).pipe(
        map(((heroes: SuperHero[]) => {
          const updateData = [...heroesLocal, heroes[0]];
          this.localstorageData.setItem('heroes', updateData);
          return heroes[0]
        }))
      )
    }
  }
}
