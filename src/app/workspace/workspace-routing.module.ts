import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './pages/board/board.component';
import { WorkspaceComponent } from './workspace.component';

const routes: Routes = [
  { path: '', component: WorkspaceComponent },
  { path: 'boards', component: BoardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkspaceRoutingModule { }
