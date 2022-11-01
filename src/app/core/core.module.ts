import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { GlobalSearchComponent } from './components/global-search/global-search.component';

@NgModule({
  declarations: [
    CoreComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    ConfirmationModalComponent,
    GlobalSearchComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
  ],
})
export class CoreModule { }
