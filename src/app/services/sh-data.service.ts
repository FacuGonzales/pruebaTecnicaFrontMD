import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, Subject, tap } from 'rxjs';
import { SuperHero } from '../models/super-hero-model';
import { LocalstorageDataService } from './localstorage-data.service';
import { LoaderService } from './loader.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShDataService {
  private heroesSubject = new Subject<SuperHero[]>();
  heroes$ = this.heroesSubject.asObservable();
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
              private localstorageData: LocalstorageDataService,
              private loader: LoaderService,
             ) { }

  private getHeroesForApi(id?: number): Observable<SuperHero[]> {
    let route: string = id ? `${this.apiUrl}/id/${id}.json` : `${this.apiUrl}/all.json`;
    return this.http.get<SuperHero[]>(route);
  }

  private getHeroesForLocal(): SuperHero[] {
    return this.localstorageData.getItem('heroes');
  }

  public getHeroes(): Observable<SuperHero[]> {
    this.loader.viewLoader();
    let heroesLocal: SuperHero[] = this.getHeroesForLocal();

    if(heroesLocal.length) {
      heroesLocal = heroesLocal.sort((a: SuperHero, b: SuperHero) => {
        return a.name.localeCompare(b.name);
      })
      this.heroesSubject.next(heroesLocal);

      setTimeout(() => {
        this.loader.disabledLoader();
      }, 1500);
      return of(heroesLocal);
    } else {
      return this.getHeroesForApi().pipe(
        tap((heroes) => {
          this.localstorageData.setItem('heroes', heroes);
          this.loader.disabledLoader();
          this.heroesSubject.next(heroes);
          return heroes;
        })
      )
    }
  }

  public getHeroById(id: number): Observable<SuperHero> {
    const heroesLocal: SuperHero[] = this.getHeroesForLocal();

    const heroSelected = heroesLocal.find(hero => hero.id === id);

    if(heroSelected) {
      return of(heroSelected);
    } else {
      return this.getHeroesForApi(id).pipe(
        map(((heroes: SuperHero[]) => {
          if(!heroes.length) throw new Error('No se encontro el heroe con el id ingresado.');

          const updateData = [...heroesLocal, heroes[0]];
          this.localstorageData.setItem('heroes', updateData);
          this.heroesSubject.next(updateData)
          return heroes[0]
        }))
      )
    }
  }

  public createHero(hero: SuperHero): Observable<boolean> {
    const heroesLocal: SuperHero[] = this.getHeroesForLocal();
    heroesLocal.push(hero);
    this.localstorageData.setItem('heroes', heroesLocal);

    this.heroesSubject.next(heroesLocal);

    return of(true)
  }

  public updateDataHero(hero: SuperHero): Observable<boolean>  {
    const heroesLocal: SuperHero[] = this.getHeroesForLocal();
    const heroIndex = heroesLocal.findIndex(h => h.id === hero.id);

    if(heroIndex === -1) throw new Error('No se encontro el heroe solicitado');

    heroesLocal[heroIndex] = hero;
    this.localstorageData.setItem('heroes', heroesLocal);

    this.heroesSubject.next(heroesLocal);

    return of(true)
  }

  public deleteHero(id: number): Observable<boolean> {
    const heroesLocal: SuperHero[] = this.getHeroesForLocal();
    const heroesUpdateList: SuperHero[] = heroesLocal.filter(h => h.id !== id);

    this.localstorageData.setItem('heroes', heroesUpdateList);
    this.heroesSubject.next(heroesUpdateList);

    return of(true)
  }

  public filterByName(name: string): Observable<SuperHero[]> {
    const heroesLocal: SuperHero[] = this.getHeroesForLocal();

    const heroesFilter: SuperHero[] = heroesLocal.filter(h =>
      h.name.toLowerCase().includes(name.toLowerCase())
    )

    this.heroesSubject.next(heroesFilter)
    return of(heroesFilter);
  }
}
