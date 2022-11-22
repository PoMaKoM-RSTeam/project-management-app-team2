import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TaskResponse } from 'src/app/core/models/project-manager.model';

@Injectable({
  providedIn: 'root',
})

export class EditTaskServie {
  private taskData$$ = new Subject<TaskResponse>();

  private taskUserId$$ = new Subject<any>();

  private openEditTaskModal$$ = new Subject<boolean>();

  taskData$ = this.taskData$$.asObservable();

  taskUserId$ = this.taskUserId$$.asObservable();

  openEditTaskModal$ = this.openEditTaskModal$$.asObservable();

  getTaskData(taskData:TaskResponse) {
    return this.taskData$$.next(taskData);
  }

  getTaskIdUsers(idT:string, usersT: string[]) {
    const taskData = {
      id: idT,
      users: usersT,
    };

    return this.taskUserId$$.next(taskData);
  }

  openEditTaskModal(isEditTask: boolean) {
    return this.openEditTaskModal$$.next(isEditTask);
  }
}
