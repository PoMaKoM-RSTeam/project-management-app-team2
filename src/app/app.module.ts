import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LocalizationModule } from './localization/localization.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './core/guards/auth-guard';
import { tokenInterceptorProviders } from './auth/interceptors/tokenInterceptor.provider';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    LocalizationModule,
    AuthModule,
  ],
  providers: [
    tokenInterceptorProviders,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
