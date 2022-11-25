import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HTTPService } from '../../../core/services/http.service';
import { TaskResponse } from '../../../core/models/project-manager.model';
import { EditTaskService } from '../../services/edit-task-service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task!: TaskResponse;

  @Output() deleteTask = new EventEmitter<TaskResponse>();

  usersTask: string[] = [];

  commentsCount = 0;

  constructor(
    public translate: TranslateService,
    private httpService: HTTPService,
    private editTaskService: EditTaskService,
  ) { }

  ngOnInit() {
    this.httpService.getTask(this.task.boardId, this.task.columnId, this.task._id)
      .subscribe((taskData) => {
        this.usersTask = taskData.users.filter((user) => !this.usersTask.includes(user));
      });

    this.editTaskService.taskUserId$.subscribe((taskData) => {
      if (this.task._id === taskData.id) {
        this.usersTask = taskData.users;
      }
    });

    this.httpService.getPointsByTaskId(this.task._id)
      .subscribe((data) => { this.commentsCount = data.length; });
  }

  onDelete = () => {
    this.httpService.deleteTask(
      this.task.boardId,
      this.task.columnId,
      this.task._id,
    ).subscribe((data) => this.deleteTask.emit(data));
  };

  clickTask(taskData: TaskResponse) {
    this.editTaskService.getTaskData(taskData);
    this.editTaskService.openEditTaskModal(true);
  }
}
