import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HTTPService } from '../../../core/services/http.service';
import { TaskResponse } from '../../../core/models/project-manager.model';
import { EditTaskServie } from '../../services/edit-task-service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task!: TaskResponse;

  @Output() deleteTask = new EventEmitter<TaskResponse>();

  usersTask: string[] = [];

  constructor(
    public translate: TranslateService,
    private httpService: HTTPService,
    private editTaskServie: EditTaskServie,
  ) { }

  ngOnInit() {
    this.httpService.getTask(this.task.boardId, this.task.columnId, this.task._id)
      .subscribe((e) => {
        this.usersTask = e.users.filter((user) => !this.usersTask.includes(user));
      });

    this.editTaskServie.taskSet$.subscribe((e) => {
      if (this.task._id === e.id) {
        this.usersTask = e.users;
      }
    });
  }

  onDelete = () => {
    this.httpService.deleteTask(
      this.task.boardId,
      this.task.columnId,
      this.task._id,
    ).subscribe((data) => this.deleteTask.emit(data));
  };

  clickTask(task:any) {
    this.editTaskServie.getTask(task);
    this.editTaskServie.openEditMpdal(true);
  }
}
