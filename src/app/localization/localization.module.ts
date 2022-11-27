import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { LocalizationRoutingModule } from './localization-routing.module';
import { LocalizationComponent } from './localization.component';

const { BASE_PATH } = environment;

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, `${BASE_PATH}assets/i18n/`);
}

@NgModule({
  declarations: [
    LocalizationComponent,
  ],
  imports: [
    CommonModule,
    LocalizationRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [HttpClient, LocalizationComponent, TranslatePipe],
  exports: [LocalizationComponent, TranslatePipe],
})
export class LocalizationModule { }
