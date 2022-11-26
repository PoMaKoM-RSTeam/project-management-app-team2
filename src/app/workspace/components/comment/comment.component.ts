/* eslint-disable prefer-destructuring */
import { Component, Input, OnInit } from '@angular/core';
import { PointResponse } from 'src/app/core/models/project-manager.model';
import { HTTPService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  userName = '';

  userId: string = '';

  message = '';

  @Input() comment!: PointResponse;

  constructor(private httpService: HTTPService) {

  }

  ngOnInit() {
    this.userId = this.comment.title.split('&')[1];
    this.message = this.comment.title.split('&')[0];
    this.httpService.getAllUsers().subscribe((data) => {
      this.userName = data.find((el) => el._id === this.userId)!.name;
    });
  }
}
