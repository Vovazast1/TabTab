import { NgModule } from '@angular/core';
import { LocationChatPage } from './location-chat.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LocationChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationChatPageRoutingModule {}
