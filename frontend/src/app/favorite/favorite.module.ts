import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritePageRoutingModule } from './favorite-routing.module';

import { FavoritePage } from './favorite.page';
import { LocationsPage } from '../locations/locations.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FavoritePageRoutingModule],
  declarations: [FavoritePage],
  providers: [LocationsPage]
})
export class FavoritePageModule {}
