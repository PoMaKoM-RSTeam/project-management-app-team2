import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import {
  FormControl, FormGroup, UntypedFormGroup, Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TaskResponse } from 'src/app/core/models/project-manager.model';
import { ChangeLanguageService } from 'src/app/core/services/changeLanguage.service';
import { HTTPService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
})
export class CreateTaskModalComponent implements OnInit {
  modalForm!: UntypedFormGroup;

  @Input() columnId: string = '';

  @Input() boardId: string = '';

  @Output() createColumn = new EventEmitter<string>();

  @Output() isModalTaskOpen = new EventEmitter<boolean>();

  @Output() createTask = new EventEmitter<TaskResponse>();

  userId!: any;

  taskCount!: number;

  constructor(
    public translate: TranslateService,
    private languageService: ChangeLanguageService,
    private htttpService: HTTPService,
  ) {
    this.modalForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    });
  }

  ngOnInit(): void {
    this.languageService.language$.subscribe((value) => this.translate.use(value));
    this.htttpService.getAllUsers().subscribe((data) => {
      const user = localStorage.getItem('login');
      this.userId = data.filter((el) => el.login === user)[0]._id;
    });
    this.htttpService.getAllTasks(this.boardId, this.columnId)
      .subscribe((data) => { this.taskCount = data.length; });
  }

  onSubmit(): void {
    this.htttpService.createTask(this.boardId, this.columnId, {
      title: this.modalForm.value.title,
      order: this.taskCount + 1,
      description: this.modalForm.value.description,
      userId: this.userId,
      users: [],
    }).subscribe((data) => {
      this.createTask.emit(data);
      this.isModalTaskOpen.emit(false);
    });
  }

  onClose() {
    this.isModalTaskOpen.emit(false);
  }
}
