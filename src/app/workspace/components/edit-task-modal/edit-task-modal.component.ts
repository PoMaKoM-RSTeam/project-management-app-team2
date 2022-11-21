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

  isEditTask: boolean | null = null;

  usersArray: string[] = [];

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
        user: new FormControl('Выберите пользователя'),
      });
      this.usersArray = [];
      this.httpService.getTask(this.task.boardId, this.task.columnId, this.task._id)
        .subscribe((e) => {
          this.usersArray = e.users;
        });
    });

    this.editTaskServie.openEditModal$.subscribe((isEditTask) => {
      this.isEditTask = isEditTask;
    });
  }

  editTask() {
    const resultTask: UpdateTaskDTO = {
      title: this.editFormTask.value.title,
      order: this.task.order,
      description: this.editFormTask.value.description,
      columnId: this.task.columnId,
      userId: this.task.userId,
      users: this.usersArray,
    };
    this.httpService.updateTask(this.task.boardId, this.task.columnId, this.task._id, resultTask)
      .subscribe((e) => {
        this.editTaskServie.setTask(e._id, e.users);
      });
    this.editTaskServie.openEditMpdal(false);
  }

  closeEditTask() {
    this.editTaskServie.openEditMpdal(false);
  }

  addUserTask() {
    const userText = this.editFormTask.value.user;
    if (this.usersArray.includes(userText)) {
      return this.usersArray;
    }
    return this.usersArray.push(userText);
  }

  removeUserTask(user: string) {
    this.usersArray = this.usersArray.filter((us) => us !== user);
  }
}
