import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationChatPageRoutingModule } from './location-chat-routing.module';

import { LocationChatPage } from './location-chat.page';

import { ApiService } from '../providers/ApiService';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationChatPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiService],
  declarations: [LocationChatPage]
})
export class LocationChatPageModule {}
