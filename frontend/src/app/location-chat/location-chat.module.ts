import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LocationChatPageRoutingModule } from './location-chat-routing.module';
import { LocationChatPage } from './location-chat.page';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from '../providers/ApiService';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, LocationChatPageRoutingModule, HttpClientModule],
  providers: [ApiService],
  declarations: [LocationChatPage]
})
export class LocationChatPageModule {}
