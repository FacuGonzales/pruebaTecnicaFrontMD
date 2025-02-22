import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SuperHero } from '../models/super-hero-model';
import { API_CONFIG } from '../api.config';
import { LocalstorageDataService } from './localstorage-data.service';

@Injectable({
  providedIn: 'root'
})
export class ShDataService {
  constructor(private http: HttpClient, private localstorageData: LocalstorageDataService) { }

  getHeroesForApi(): Observable<SuperHero[]> {
    return this.http.get<SuperHero[]>(`${API_CONFIG.baseUrl}`);
  }

  getHeroes(): Observable<SuperHero[]> {
    const heroes: SuperHero[] = this.localstorageData.getItem('hero');

    if(heroes.length) {
      return new Observable((observer) => observer.next(heroes));
    } else {
      return this.getHeroesForApi().pipe(
        tap((heroesOfApi) => {
          this.localstorageData.setItem('hero', heroesOfApi);
        })
      )
    }
  }
}
