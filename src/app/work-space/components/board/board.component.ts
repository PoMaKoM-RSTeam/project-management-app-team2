import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ColumnResponse } from 'src/app/core/models/project-manager.model';
import { TranslateService } from '@ngx-translate/core';
import { ChangeLanguageService } from 'src/app/core/services/changeLanguage.service';

export interface Column {
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
export class BoardComponent implements OnInit {
  board = {
    title: 'Test board',
    owner: 'kate4ka',
    users: ['IMask', 'kate4ka2'],
    _id: '636ab9589d9152c02a88d2f3',
  };

  columns: Array<ColumnResponse> = [
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

  constructor(
    public translate: TranslateService,
    private languageService: ChangeLanguageService,
  ) { }

  ngOnInit(): void {
    this.languageService.language$.subscribe((value) => this.translate.use(value));
  }

  drop(event: CdkDragDrop<ColumnResponse[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.columns.forEach((el) => {
      // eslint-disable-next-line no-param-reassign
      el.order = this.columns.indexOf(el) + 1;
    });
  }
}
