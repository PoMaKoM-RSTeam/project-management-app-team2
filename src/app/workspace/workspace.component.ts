import {
  Component, OnInit,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BoardResponse } from '../core/models/project-manager.model';
import { ChangeLanguageService } from '../core/services/changeLanguage.service';
import { HTTPService } from '../core/services/http.service';
import { CreateBoardService } from './services/create-board-services';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkSpaceComponent implements OnInit {
  isStateFormBoard: boolean | null = null;

  nameBoard: string | null = null;

  boards: BoardResponse[] = [];

  constructor(
    public translate: TranslateService,
    private languageService: ChangeLanguageService,
    private createFormService:CreateBoardService,
    private httpService:HTTPService,
  ) { }

  ngOnInit(): void {
    this.languageService.language$.subscribe((value) => this.translate.use(value));

    this.nameBoard = 'NAME';

    this.httpService.getAllBoards().subscribe((e) => {
      this.boards = e;
      return this.boards;
    });
  }

  // eslint-disable-next-line class-methods-use-this
  deleteBoard() {
    console.log('1');
  }

  createForm() {
    this.createFormService.stateFormBoard(true);
  }
}
