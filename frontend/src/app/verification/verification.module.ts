import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificationPageRoutingModule } from './verification-routing.module';

import { VerificationPage } from './verification';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, VerificationPageRoutingModule],
  declarations: [VerificationPage]
})
export class VerificationPageModule {}
