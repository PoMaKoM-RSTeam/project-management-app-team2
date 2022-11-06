import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginComponent } from './components/login/login.component';
import { ZorroModule } from '../core/zorro/zorro.module';
import { LoginService } from './services/login-service';
import { LocalizationModule } from '../localization/localization.module';
import { RegistrationComponent } from './components/registration/registration.component';

@NgModule({
  declarations: [
    AuthComponent,
    LogoutComponent,
    LoginComponent,
    RegistrationComponent,

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
