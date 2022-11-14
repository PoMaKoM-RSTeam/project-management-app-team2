import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';
import { BoardComponent } from './pages/board/board.component';
import { ColumnComponent } from './components/column/column.component';
import { LocalizationModule } from '../localization/localization.module';
// import { CoreModule } from '../core/core.module';
import { ZorroModule } from '../core/zorro/zorro.module';
import { CreateColumnModalComponent } from './components/create-column-modal/create-column-modal.component';
import { CreateTaskModalComponent } from './components/create-task-modal/create-task-modal.component';
import { TaskComponent } from './components/task/task.component';

@NgModule({
  declarations: [
    WorkspaceComponent,
    ColumnComponent,
    BoardComponent,
    CreateColumnModalComponent,
    CreateTaskModalComponent,
    TaskComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ZorroModule,
    ReactiveFormsModule,
    WorkspaceRoutingModule,
    LocalizationModule,
    DragDropModule,
  ],
})
export class WorkspaceModule { }
