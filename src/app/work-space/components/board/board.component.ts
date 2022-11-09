import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

interface Column {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  board = {
    title: 'Welcome Page',
    owner: 'kate4ka',
    users: ['IMask', 'kate4ka2'],
    _id: '636ab9589d9152c02a88d2f3',
  };

  columns: Array<Column> = [
    {
      _id: '111',
      title: 'TO DO',
      order: 1,
      boardId: '636ab9589d9152c02a88d2f3',
    },
    {
      _id: '222',
      title: 'DOING',
      order: 2,
      boardId: '636ab9589d9152c02a88d2f3',
    },
    {
      _id: '333',
      title: 'DONE',
      order: 3,
      boardId: '636ab9589d9152c02a88d2f3',
    },
    {
      _id: '444',
      title: 'TESTING',
      order: 4,
      boardId: '636ab9589d9152c02a88d2f3',
    },
  ];

  drop(event: CdkDragDrop<Column[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    console.log(this.columns);
    this.columns.forEach((el) => {
      // eslint-disable-next-line no-param-reassign
      el.order = this.columns.indexOf(el) + 1;
    });
  }
}
