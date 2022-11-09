import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { WorkSpaceRoutingModule } from './work-space-routing.module';
import { WorkSpaceComponent } from './work-space.component';
import { ColumnComponent } from './components/column/column.component';
import { BoardComponent } from './components/board/board.component';
import { LocalizationModule } from '../localization/localization.module';

@NgModule({
  declarations: [
    WorkSpaceComponent,
    ColumnComponent,
    BoardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WorkSpaceRoutingModule,
    LocalizationModule,
    DragDropModule,
  ],
})
export class WorkSpaceModule { }
