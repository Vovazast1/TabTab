import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';

import { Pages } from './pages';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PagesRoutingModule
  ],
  declarations: [Pages]
})
export class PagesModule {}
