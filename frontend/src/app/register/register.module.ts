import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterPage } from './register';

import { RegisterPageRoutingModule } from './register-routing.module';
import { SharedModule } from '../components/shared.module';

@NgModule({
  imports: [IonicModule, CommonModule, SharedModule, FormsModule, RegisterPageRoutingModule, ReactiveFormsModule],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
