import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginComponent } from './components/login/login.component';
import { ZorroModule } from '../core/zorro/zorro.module';

@NgModule({
  declarations: [
    AuthComponent,
    LogoutComponent,
    LoginComponent,

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ZorroModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule { }
