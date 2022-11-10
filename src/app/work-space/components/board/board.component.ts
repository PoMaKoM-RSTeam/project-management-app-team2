import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BoardResponse, ColumnResponse } from 'src/app/core/models/project-manager.model';
import { TranslateService } from '@ngx-translate/core';
import { ChangeLanguageService } from 'src/app/core/services/changeLanguage.service';
import { HTTPService } from 'src/app/core/services/http.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  board: BoardResponse | undefined;

  columns!: Array<ColumnResponse>;

  param = '';

  constructor(
    public translate: TranslateService,
    private languageService: ChangeLanguageService,
    private httpService: HTTPService,
    private modal: NzModalService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.languageService.language$.subscribe((value) => this.translate.use(value));
    this.activatedRoute.queryParams.subscribe((param) => {
      const data = param['id'];
      this.param = data;
      console.log(this.param);
    });
    this.httpService.getBoardById(this.param).subscribe((board) => {
      this.board = board;
    });
    this.httpService.getAllColumns(this.param).subscribe((columns) => {
      this.columns = columns;
    });
  }

  drop(event: CdkDragDrop<ColumnResponse[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.columns.forEach((el) => {
      el.order = this.columns.indexOf(el) + 1;
    });
  }

  deleteColumn(id: string) {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this column?',
      nzContent: '<b style="color: red;">This action cannot be undone</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.columns = this.columns.filter((item) => item._id !== id);
        this.httpService.deleteColumn(this.board!._id, id);
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
}
