import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/super-heroes-page/super-heroes-page.component').then(p => p.SuperHeroesPageComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/edit-super-hero/edit-super-hero.component').then(p => p.EditSuperHeroComponent)
  },
  {
    path: 'edit',
    loadComponent: () => import('./pages/edit-super-hero/edit-super-hero.component').then(p => p.EditSuperHeroComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/super-heroes-page/super-heroes-page.component').then(p => p.SuperHeroesPageComponent)
  }
];
