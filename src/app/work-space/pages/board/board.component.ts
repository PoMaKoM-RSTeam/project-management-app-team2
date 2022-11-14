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

  title!: string;

  subTitle!: string;

  yes!: string;

  no!: string;

  columns: Array<ColumnResponse> = [
    {
      _id: 'ggddvddd',
      title: 'Angular',
      order: 1,
      boardId: 'gbsgsas',
    },
  ];

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
    /*     this.httpService.getAllColumns(this.param).subscribe((columns) => {
          this.columns = columns;
        }); */
  }

  drop(event: CdkDragDrop<ColumnResponse[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.columns.forEach((el) => {
      el.order = this.columns.indexOf(el) + 1;
    });
  }

  deleteColumn(id: string) {
    this.translate.get('MODAL.TITLE').subscribe((res: string) => { this.title = res; });
    this.translate.get('MODAL.SUB_TITLE').subscribe((res: string) => { this.subTitle = res; });
    this.translate.get('MODAL.YES').subscribe((res: string) => { this.yes = res; });
    this.translate.get('MODAL.NO').subscribe((res: string) => { this.no = res; });
    this.modal.confirm({
      nzTitle: this.title,
      nzContent: `<b style="color: red;">${this.subTitle}</b>`,
      nzOkText: this.yes,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.columns = this.columns.filter((item) => item._id !== id);
        this.httpService.deleteColumn(this.board!._id, id);
      },
      nzCancelText: this.no,
      nzOnCancel: () => console.log('Cancel'),
    });
  }
}