import {Route} from '@angular/router';

export const appRoutes: Route[] = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {
    path: 'main',
    loadComponent: () => import('./components/main/main.component').then((x) => x.MainComponent),
  },
  {
    path: 'cocktail/:cocktailId',
    loadComponent: () => import('./components/drink-details/drink-details.component').then((x) => x.DrinkDetailsComponent),
  },
  {path: '**', redirectTo: '/main'}
];
