import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HTTPService } from '../../../core/services/http.service';
import { TaskResponse } from '../../../core/models/project-manager.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: TaskResponse;

  @Output() deleteTask = new EventEmitter<TaskResponse>();

  constructor(public translate: TranslateService, private httpService: HTTPService) { }

  onDelete() {
    this.httpService.deleteTask(
      this.task.boardId,
      this.task.columnId,
      this.task._id,
    ).subscribe((data) => this.deleteTask.emit(data));
  }
}
