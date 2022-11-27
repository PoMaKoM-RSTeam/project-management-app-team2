import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

import { ZorroModule } from '../core/zorro/zorro.module';
import { LocalizationModule } from '../localization/localization.module';

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,

    ZorroModule,
    ReactiveFormsModule,
    LocalizationModule,
  ],
})
export class ProfileModule { }
