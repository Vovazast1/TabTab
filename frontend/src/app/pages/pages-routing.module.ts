import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages } from './pages';

const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    children: [
      {
        path: 'loader',
        loadChildren: () => import('../loader/loader.module').then(m => m.LoaderModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('../register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: 'activity',
        loadChildren: () => import('../activity/activity.module').then(m => m.ActivityPageModule)
      },
      {
        path: 'locations/:activity',
        loadChildren: () => import('../locations/locations.module').then(m => m.LocationsPageModule)
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

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class PagesRoutingModule {}
