import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationChatPage } from './location-chat.page';

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
