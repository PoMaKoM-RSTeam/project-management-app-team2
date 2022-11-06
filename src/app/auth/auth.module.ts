import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginComponent } from './components/login/login.component';
import { ZorroModule } from '../core/zorro/zorro.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginService } from './services/login-service';
import { LocalizationModule } from '../localization/localization.module';

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
    LocalizationModule,
  ],
  providers: [
    LoginService,
  ],
})
export class AuthModule { }
