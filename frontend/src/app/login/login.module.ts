import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login';

import { LoginPageRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
