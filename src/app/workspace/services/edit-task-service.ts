import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TaskResponse } from 'src/app/core/models/project-manager.model';

@Injectable({
  providedIn: 'root',
})

export class EditTaskServie {
  private task$$ = new Subject<TaskResponse>();

  task$ = this.task$$.asObservable();

  getTask(task:TaskResponse) {
    return this.task$$.next(task);
  }

  setTask(task:TaskResponse) {
    return this.task$$.next(task);
  }
}
