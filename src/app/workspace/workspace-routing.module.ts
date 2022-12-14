import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './pages/board/board.component';
import { WorkSpaceComponent } from './workspace.component';

const routes: Routes = [
  { path: '', component: WorkSpaceComponent },
  { path: 'boards', component: BoardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkspaceRoutingModule { }
