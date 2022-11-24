import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  BoardResponse,
  ColumnResponse,
  TaskResponse,
} from 'src/app/core/models/project-manager.model';
import { TranslateService } from '@ngx-translate/core';
import { ChangeLanguageService } from 'src/app/core/services/changeLanguage.service';
import { HTTPService } from 'src/app/core/services/http.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute } from '@angular/router';

import { NavigationService } from 'src/app/core/services/navigation.service';
import {
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { EditTaskServie } from '../../services/edit-task-service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  board: BoardResponse | undefined;

  title!: string;

  subTitle!: string;

  confirm!: string;

  cancel!: string;

  columns!: Array<ColumnResponse>;

  param = '';

  snowModal = false;

  isCollapsed = false;

  isTitleClicked = '';

  inputForm!: UntypedFormGroup;

  columnTitle = 'Title';

  prevTitle = '';

  isForbidChangeTitle = false;

  isCreateTaskModalOpen = false;

  boardId = '';

  columnId = '';

  userId = '';

  boardIdForDelete = '';

  isFilterVisible = false;

  filterInputValue = '';

  constructor(
    public translate: TranslateService,
    private languageService: ChangeLanguageService,
    private httpService: HTTPService,
    private modal: NzModalService,
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private filterService: FilterService,
    private editTaskServie: EditTaskServie,
  ) {
    this.inputForm = new FormGroup({
      myInput: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
      ]),
    });
  }

  ngOnInit(): void {
    this.languageService.language$.subscribe((value) => this.translate.use(value));
    this.activatedRoute.queryParams.subscribe((param) => {
      const data = param['id'];
      this.param = data;
    });
    this.httpService.getBoardById(this.param).subscribe((board) => {
      this.board = board;
    });

    this.httpService.getAllColumns(this.param).subscribe((columns) => {
      this.columns = columns.sort((a, b) => a.order - b.order);
      this.columns.forEach((item) => {
        this.httpService
          .getAllTasks(item.boardId, item._id)
          .subscribe((data) => {
            item.tasks! = data.sort((a, b) => a.order - b.order);
          });
      });
    });

    this.navigationService.collaps.subscribe((data) => {
      this.isCollapsed = data;
    });

    this.editTaskServie.taskData$.subscribe((taskService) => {
      this.columns.forEach((column) => {
        column.tasks?.forEach((task) => {
          if (taskService._id === task._id) {
            task.title = taskService.title;
            task.description = taskService.description;
            task.users = this.board!.users;
          }
        });
      });

    this.filterService.filterInputValue$.subscribe((data) => {
      this.filterInputValue = data;
    });
  }

  drop(event: CdkDragDrop<ColumnResponse[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.columns.forEach((el) => {
      el.order = this.columns.indexOf(el) + 1;
    });

    this.columns.forEach((el) => {
      this.httpService
        .updateColumnsSet([
          {
            order: el.order,
            _id: el._id,
          },
        ])
        .subscribe((data) => console.log(data));
    });
  }

  dropTasks(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.columns.forEach((item) => {
      item.tasks!.forEach((el) => {
        el.order = item.tasks!.indexOf(el) + 1;
        this.httpService
          .updateTask(item.boardId, item._id, el._id, {
            title: el.title,
            order: el.order,
            description: el.description,
            columnId: item._id,
            userId: el.userId,
            users: el.users,
          })
          .subscribe((data) => data);
      });
    });
  }

  deleteColumn = () => {
    this.columns = this.columns.filter((item) => item._id !== this.boardIdForDelete);
    this.httpService
      .deleteColumn(this.board!._id, this.boardIdForDelete)
      .subscribe((data) => console.log(data));
    this.columns.forEach((el) => {
      el.order = this.columns.indexOf(el) + 1;
      this.httpService
        .updateColumnsSet([
          {
            order: el.order,
            _id: el._id,
          },
        ])
        .subscribe((data) => console.log(data));
    });
  };

  onCreateColumn() {
    this.snowModal = true;
  }

  createColumn(value: string) {
    if (value) {
      this.httpService
        .createColumn(this.board!._id, {
          title: value,
          order: this.columns.length + 1,
        })
        .subscribe((data) => {
          this.columns.push({
            title: data.title,
            order: data.order,
            boardId: data.boardId,
            _id: data._id,
            tasks: [],
          });
        });
      this.snowModal = false;
    }
  }

  closeOpen(bool: boolean) {
    this.snowModal = bool;
  }

  onTitleClick(title: string, id: string): void {
    if (!this.isForbidChangeTitle) {
      this.prevTitle = title;
      this.isTitleClicked = id;
      this.isForbidChangeTitle = true;
    }
  }

  onSubmitForm(str: ColumnResponse): void {
    if (str.title) {
      this.isTitleClicked = '';
      // eslint-disable-next-line no-return-assign
      this.columns.forEach((el) => (el._id === str._id ? (el.title = str.title) : el.title));
      this.httpService
        .editColumn(this.board!._id, str._id, {
          title: str.title,
          order: str.order,
        })
        .subscribe((el) => el);
      this.isForbidChangeTitle = false;
    }
  }

  onTaskModalOpen(boardId: string, columnId: string) {
    this.boardId = boardId;
    this.columnId = columnId;
    this.isCreateTaskModalOpen = true;
  }

  createTask(task: TaskResponse) {
    this.columns.find((el) => el._id === task.columnId)!.tasks!.push(task);
  }

  isModalTaskOpen(bool: boolean) {
    this.isCreateTaskModalOpen = bool;
  }

  deleteTask(task: TaskResponse) {
    this.columns.forEach((item) => {
      item.tasks = item.tasks!.filter((el) => el._id !== task._id);
    });
  }

  defineColumnId(id: string) {
    this.boardIdForDelete = id;
  }

  onFilterPush() {
    this.isFilterVisible = !this.isFilterVisible;
  }

  onFilterClear() {
    this.filterService.updateFilterString('');
  }
}
