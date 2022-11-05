import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginComponent } from './components/login/login.component';
import { ZorroModule } from '../core/zorro/zorro.module';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AuthComponent,
    LogoutComponent,
    LoginComponent,
    RegisterComponent,

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ZorroModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule { }
