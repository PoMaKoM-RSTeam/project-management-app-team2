import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PointResponse, TaskResponse } from 'src/app/core/models/project-manager.model';
import { HTTPService } from 'src/app/core/services/http.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CommentsCounterService } from '../../services/comments-counter.service';

@Component({
  selector: 'app-comments-block',
  templateUrl: './comments-block.component.html',
  styleUrls: ['./comments-block.component.scss'],
})
export class CommentsBlockComponent implements OnInit {
  userName: string = '';

  @Input() task!: TaskResponse;

  comments: PointResponse[] = [];

  userId: string = '';

  message: string = '';

  commentForm: FormGroup = new FormGroup({
    message: new FormControl('', Validators.required),
  });

  constructor(
    private httpService: HTTPService,
    public translate: TranslateService,
    private authService: AuthService,
    private commentsCounterService: CommentsCounterService,
  ) { }

  ngOnInit(): void {
    this.authService.userName$.subscribe((data) => { this.userName = data; });
    this.authService.userId$.subscribe((data) => { this.userId = data; });
    this.httpService.getPointsByTaskId(this.task._id)
      .subscribe((data) => { this.comments = data; });
  }

  onSubmit(): void {
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

      this.commentsCounterService.updateCounter(
        { taskId: data.taskId, count: this.comments.length },
      );
    });
    this.commentForm.reset();
  }
}
