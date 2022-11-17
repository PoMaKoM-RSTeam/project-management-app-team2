import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PointResponse, StorageKeys, TaskResponse } from 'src/app/core/models/project-manager.model';
import { HTTPService } from 'src/app/core/services/http.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-comments-block',
  templateUrl: './comments-block.component.html',
  styleUrls: ['./comments-block.component.scss'],
})
export class CommentsBlockComponent implements OnInit {
  userName: string | undefined = undefined;

  @Input() task!: TaskResponse;

  comments: PointResponse[] = [];

  userId: string = '';

  message: string = '';

  commentForm: FormGroup = new FormGroup({
    message: new FormControl('', Validators.required),
  });

  constructor(private httpService: HTTPService, public translate: TranslateService) { }

  ngOnInit() {
    this.userName = localStorage.getItem(StorageKeys.UserName)!;
    this.userId = localStorage.getItem(StorageKeys.UserId)!;
    this.httpService.getPointsByTaskId(this.task._id)
      .subscribe((data) => { this.comments = data; });
  }

  onSubmit() {
    this.httpService.createPoint({
      title: `${this.commentForm.value.message}&${this.userId}`,
      taskId: this.task._id,
      boardId: this.task.boardId,
      done: false,
    }).subscribe((data) => {
      this.comments.push({
        title: data.title,
        taskId: data.taskId,
        boardId: data.boardId,
        done: false,
        _id: data._id,
      });
    });
    this.commentForm.reset();
  }
}
