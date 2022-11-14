import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkSpaceComponent } from './workspace.component';
import { BoardComponent } from './pages/board/board.component';
import { ColumnComponent } from './components/column/column.component';
import { LocalizationModule } from '../localization/localization.module';
import { ZorroModule } from '../core/zorro/zorro.module';

import { CreateBoardComponent } from './components/create-board/create-board.component';
import { AddUsersFormComponent } from './components/add-users-form/add-users-form.component';
import { CreateColumnModalComponent } from './components/create-column-modal/create-column-modal.component';

@NgModule({
  declarations: [
    WorkSpaceComponent,
    ColumnComponent,
    BoardComponent,
    CreateBoardComponent,
    AddUsersFormComponent,
    CreateColumnModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ZorroModule,
    ReactiveFormsModule,
    WorkspaceRoutingModule,
    LocalizationModule,
    DragDropModule,
    ZorroModule,
  ],
})
export class WorkspaceModule { }
