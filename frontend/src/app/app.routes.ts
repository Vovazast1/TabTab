import { Routes } from '@angular/router';
import { Pages } from './pages/pages';

export const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    children: [
      {
        path: 'loader',
        loadComponent: () => import('./loader/loader').then(m => m.Loader)
      },
      {
        path: 'first-page',
        loadComponent: () => import('./first-page/first-page').then(m => m.FirstPage)
      },
      {
        path: '',
        redirectTo: '/pages/loader',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/pages/loader',
    pathMatch: 'full'
  }
];