import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkSpaceRoutingModule } from './work-space-routing.module';
import { WorkSpaceComponent } from './work-space.component';
import { BoardComponent } from './pages/board/board.component';
import { LocalizationModule } from '../localization/localization.module';

@NgModule({
  declarations: [
    WorkSpaceComponent,
    BoardComponent,
  ],
  imports: [
    CommonModule,
    WorkSpaceRoutingModule,
    LocalizationModule,
  ],
})
export class WorkSpaceModule { }
