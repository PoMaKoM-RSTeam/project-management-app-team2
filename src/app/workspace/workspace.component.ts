import {
  Component, OnInit,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BoardResponse, SignUpResponse, TaskResponse } from '../core/models/project-manager.model';
import { ChangeLanguageService } from '../core/services/changeLanguage.service';
import { HTTPService } from '../core/services/http.service';
import { NavigationService } from '../core/services/navigation.service';
import { SearchService } from '../core/services/search.service';
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

  boardIdForDelete = '';

  navigationClose = false;

  searchResults: TaskResponse[] | undefined;

  searchString: string = '';

  constructor(
    public translate: TranslateService,
    private languageService: ChangeLanguageService,
    private createFormService: CreateBoardService,
    private httpService: HTTPService,
    private getUsersServices: GetUsersServices,
    private navigationService: NavigationService,
    private searchService: SearchService,
  ) { }

  ngOnInit(): void {
    this.languageService.language$.subscribe((value) => this.translate.use(value));

    this.httpService.getAllBoards().subscribe((e) => {
      this.boards = e;
    });

    this.createFormService.boards$.subscribe((boards) => {
      this.boards.push(boards);
    });

    this.navigationService.collaps.subscribe((data) => { this.navigationClose = data; });

    this.searchService.results$.subscribe((searchResults) => {
      this.searchResults = searchResults;
    });

    this.searchService.searchString$.subscribe((searchString) => {
      this.searchString = searchString;
    });
  }

  deleteBoard = () => {
    this.httpService.deleteBoard(this.boardIdForDelete).subscribe((e) => {
      this.boards = this.boards.filter((el: BoardResponse) => el._id !== e._id);
    });
    this.boardIdForDelete = '';
  };

  createForm() {
    this.createFormService.stateFormBoard(true);
    this.httpService.getAllUsers().subscribe((user) => {
      this.getUsersServices.getUsers(user);
    });
  }
}
