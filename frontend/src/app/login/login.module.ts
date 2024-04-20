import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login';
import { LoginPageRoutingModule } from './login-routing.module';
import { ApiService } from '../providers/ApiService';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../components/shared.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [ApiService],
  declarations: [LoginPage]
})
export class LoginPageModule {}
