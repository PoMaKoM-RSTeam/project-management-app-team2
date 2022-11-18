import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskResponse, UpdateTaskDTO } from 'src/app/core/models/project-manager.model';
import { HTTPService } from 'src/app/core/services/http.service';
import { EditTaskServie } from '../../services/edit-task-service';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
})
export class EditTaskModalComponent implements OnInit {
  task!: TaskResponse;

  editFormTask!: FormGroup;

  constructor(
    private editTaskServie: EditTaskServie,
    private httpService: HTTPService,
  ) { }

  ngOnInit() {
    this.editTaskServie.task$.subscribe((task) => {
      this.task = task;
      this.editFormTask = new FormGroup({
        title: new FormControl(this.task?.title),
        description: new FormControl(this.task?.description),
      });
      console.log(this.task);
    });

    console.log(this.task?.title, '1');
  }

  editTask() {
    const resultTask: UpdateTaskDTO = {
      title: this.editFormTask.value.title,
      order: this.task.order,
      description: this.editFormTask.value.description,
      columnId: this.task.columnId,
      userId: this.task.userId,
      users: this.task.users,
    };
    this.httpService.updateTask(this.task.boardId, this.task.columnId, this.task._id, resultTask)
      .subscribe((e) => this.editTaskServie.setTask(e));
  }
}
