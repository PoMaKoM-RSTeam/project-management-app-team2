import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments-block',
  templateUrl: './comments-block.component.html',
  styleUrls: ['./comments-block.component.scss'],
})
export class CommentsBlockComponent {
  comments = [{
    title: 'Some text Some text Sometext Some text Some text',
    taskId: '6373efd39d9152c02a88f731',
    boardId: 'boardId',
    done: true,
    _id: '637560149d9152c02a88fd36',
  },
  {
    title: 'Angular SometextSometextSometextSomete xtSo me text',
    taskId: '6373efd39d9152c02a88f731',
    boardId: 'boardId',
    done: true,
    _id: '637560149d9152c02a88fd36',
  },
  ];

  commentForm: FormGroup = new FormGroup({
    message: new FormControl('', Validators.required),
  });

  onSubmit() { }
}
