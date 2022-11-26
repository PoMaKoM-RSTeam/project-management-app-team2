import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskResponse, UpdateTaskDTO } from 'src/app/core/models/project-manager.model';
import { HTTPService } from 'src/app/core/services/http.service';
import { SetUserServices } from '../../services/set-user-services';
import { EditTaskService } from '../../services/edit-task-service';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
})
export class EditTaskModalComponent implements OnInit {
  task!: TaskResponse;

  editFormTask!: FormGroup;

  openEditTaskModal: boolean | null = null;

  users: string[] = [];

  constructor(
    private editTaskService: EditTaskService,
    private httpService: HTTPService,
    private setUserServices: SetUserServices,
  ) { }

  ngOnInit() {
    this.editTaskService.taskData$.subscribe((task) => {
      this.task = task;
      this.editFormTask = new FormGroup({
        title: new FormControl(this.task?.title),
        description: new FormControl(this.task?.description),
      });
      this.users = [];
      this.httpService.getTask(this.task.boardId, this.task.columnId, this.task._id)
        .subscribe((taskData) => {
          this.users = taskData.users;
        });
    });

    this.editTaskService.openEditTaskModal$.subscribe((openEditTaskModal) => {
      this.openEditTaskModal = openEditTaskModal;
    });

    this.setUserServices.userName$.subscribe((user) => {
      if (this.users.includes(user)) {
        return this.users;
      }
      return this.users.push(user);
    });
  }

  editTask() {
    const resultTask: UpdateTaskDTO = {
      title: this.editFormTask.value.title,
      order: this.task.order,
      description: this.editFormTask.value.description,
      columnId: this.task.columnId,
      userId: this.task.userId,
      users: this.users,
    };
    this.httpService.updateTask(this.task.boardId, this.task.columnId, this.task._id, resultTask)
      .subscribe((taskData) => {
        this.editTaskService.getTaskIdUsers(taskData._id, taskData.users);
        this.editTaskService.getTaskData(taskData);
      });

    return this.editTaskService.openEditTaskModal(false);
  }

  closeEditTask() {
    this.editTaskService.openEditTaskModal(false);
    return this.editFormTask.reset();
  }

  removeUserTask(user: string) {
    this.users = this.users.filter((userTask) => userTask !== user);
    return this.users;
  }
}
