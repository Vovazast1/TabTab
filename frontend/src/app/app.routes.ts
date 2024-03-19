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
        path: 'login-page',
        loadComponent: () => import('./login-page/login-page').then(m => m.LoginPage)
      },
      {
        path: 'register-page',
        loadComponent: () => import('./register-page/register-page').then(m => m.RegisterPage)
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