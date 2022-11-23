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
import { CreateTaskModalComponent } from './components/create-task-modal/create-task-modal.component';
import { TaskComponent } from './components/task/task.component';
import { CoreModule } from '../core/core.module';
import { CommentComponent } from './components/comment/comment.component';
import { CommentsBlockComponent } from './components/comments-block/comments-block.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

@NgModule({
  declarations: [
    WorkSpaceComponent,
    ColumnComponent,
    BoardComponent,
    CreateBoardComponent,
    AddUsersFormComponent,
    CreateColumnModalComponent,
    CreateTaskModalComponent,
    TaskComponent,
    CommentComponent,
    CommentsBlockComponent,
    SearchResultsComponent,
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
    CoreModule,
  ],
})
export class WorkspaceModule { }
