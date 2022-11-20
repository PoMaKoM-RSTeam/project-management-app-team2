import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TaskResponse } from 'src/app/core/models/project-manager.model';

@Injectable({
  providedIn: 'root',
})

export class EditTaskServie {
  private task$$ = new Subject<TaskResponse>();

  private openEditModal$$ = new Subject<boolean>();

  private taskData$$ = new Subject<any>();

  task$ = this.task$$.asObservable();

  openEditModal$ = this.openEditModal$$.asObservable();

  taskData$ = this.taskData$$.asObservable();

  getTaskData(idT:string, usersT: string[]) {
    const taskData = {
      id: idT,
      users: usersT,
    };
    this.taskData$$.next(taskData);
  }

  getTask(task:TaskResponse) {
    return this.task$$.next(task);
  }

  setTask(task:TaskResponse) {
    return this.task$$.next(task);
  }

  openEditMpdal(isEditTask: boolean) {
    return this.openEditModal$$.next(isEditTask);
  }
}
