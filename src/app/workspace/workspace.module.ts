import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { WorkSpaceRoutingModule } from './workspace-routing.module';
import { WorkSpaceComponent } from './workspace.component';
import { BoardComponent } from './pages/board/board.component';
import { ColumnComponent } from './components/column/column.component';
import { LocalizationModule } from '../localization/localization.module';
import { ZorroModule } from '../core/zorro/zorro.module';
import { CreateBoardComponent } from './components/create-board/create-board.component';

@NgModule({
  declarations: [
    WorkSpaceComponent,
    ColumnComponent,
    BoardComponent,
    CreateBoardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ZorroModule,
    ReactiveFormsModule,
    WorkSpaceRoutingModule,
    LocalizationModule,
    DragDropModule,
  ],
})
export class WorkSpaceModule { }
