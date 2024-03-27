import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Loader } from './loader';

const routes: Routes = [
  {
    path: '',
    component: Loader,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoaderRoutingModule {}
