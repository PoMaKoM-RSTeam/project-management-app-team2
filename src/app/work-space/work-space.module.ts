import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkSpaceRoutingModule } from './work-space-routing.module';
import { WorkSpaceComponent } from './work-space.component';

@NgModule({
  declarations: [
    WorkSpaceComponent,
  ],
  imports: [
    CommonModule,
    WorkSpaceRoutingModule,
  ],
})
export class WorkSpaceModule { }
