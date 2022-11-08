import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkSpaceRoutingModule } from './work-space-routing.module';
import { WorkSpaceComponent } from './work-space.component';
import { ColumnComponent } from './components/column/column.component';

@NgModule({
  declarations: [
    WorkSpaceComponent,
    ColumnComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WorkSpaceRoutingModule,
  ],
})
export class WorkSpaceModule { }
