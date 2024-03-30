import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Loader } from './loader';

import { LoaderRoutingModule } from './loader-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, LoaderRoutingModule],
  declarations: [Loader],
})
export class LoaderModule {}
