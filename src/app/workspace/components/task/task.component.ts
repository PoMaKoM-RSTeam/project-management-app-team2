import { Component, Input } from '@angular/core';
import { TaskResponse } from '../../../core/models/project-manager.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: TaskResponse;
}
