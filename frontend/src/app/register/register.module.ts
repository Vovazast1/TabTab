import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterPage } from './register';
import { LoginPage } from '../login/login';

import { RegisterPageRoutingModule } from './register-routing.module';
import { SharedModule } from '../components/shared.module';
import { VerificationPage } from '../verification/verification';

@NgModule({
  imports: [IonicModule, CommonModule, SharedModule, FormsModule, RegisterPageRoutingModule, ReactiveFormsModule],
  declarations: [RegisterPage],
  providers: [LoginPage, VerificationPage]
})
export class RegisterPageModule {}
