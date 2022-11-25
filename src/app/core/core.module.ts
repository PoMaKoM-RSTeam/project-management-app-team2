import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { GlobalSearchComponent } from './components/global-search/global-search.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderProfileComponent } from './components/header-profile/header-profile.component';
import { ZorroModule } from './zorro/zorro.module';
import { LocalizationModule } from '../localization/localization.module';
import { UserLogoPipe } from './pipes/user-logo.pipe';
import { UserLogoComponent } from './components/user-logo/user-logo.component';
import { TokenExpiredDialogComponent } from './components/token-expired-dialog/token-expired-dialog.component';

@NgModule({
  declarations: [
    CoreComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    ConfirmationModalComponent,
    GlobalSearchComponent,
    HeaderProfileComponent,
    ConfirmationModalComponent,
    TokenExpiredDialogComponent,
    UserLogoPipe,
    UserLogoComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    ZorroModule,
    LocalizationModule,
    ReactiveFormsModule,
  ],
  exports: [
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    ConfirmationModalComponent,
    TokenExpiredDialogComponent,
    UserLogoPipe,
    UserLogoComponent,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
  ],
})
export class CoreModule { }
