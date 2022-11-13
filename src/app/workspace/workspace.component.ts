import {
  Component, OnInit,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BoardResponse, SignUpResponse } from '../core/models/project-manager.model';
import { ChangeLanguageService } from '../core/services/changeLanguage.service';
import { HTTPService } from '../core/services/http.service';
import { CreateBoardService } from './services/create-board-services';
import { GetUsersServices } from './services/get-users-services';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkSpaceComponent implements OnInit {
  isStateFormBoard: boolean | null = null;

  nameBoard: string | null = null;

  boards: BoardResponse[] = [];

  users: SignUpResponse[] = [];

  constructor(
    public translate: TranslateService,
    private languageService: ChangeLanguageService,
    private createFormService:CreateBoardService,
    private httpService:HTTPService,
    private getUsersServices:GetUsersServices,
  ) { }

  ngOnInit(): void {
    this.languageService.language$.subscribe((value) => this.translate.use(value));

    this.httpService.getAllBoards().subscribe((e) => {
      this.boards = e;
    });

    this.createFormService.boards$.subscribe((boards) => {
      this.boards.push(boards);
    });
  }

  deleteBoard(id:string) {
    this.httpService.deleteBoard(id).subscribe((e) => {
      this.boards = this.boards.filter((el: BoardResponse) => el._id !== e._id);
    });
  }

  createForm() {
    this.createFormService.stateFormBoard(true);
    this.httpService.getAllUsers().subscribe((user) => {
      this.getUsersServices.getUsers(user);
    });
  }
}
