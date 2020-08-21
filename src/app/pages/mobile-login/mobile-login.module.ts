import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileLoginPageRoutingModule } from './mobile-login-routing.module';

import { MobileLoginPage } from './mobile-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileLoginPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MobileLoginPage]
})
export class MobileLoginPageModule {}
