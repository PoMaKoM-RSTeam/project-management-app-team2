import {
  Component, Input, OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BoardDTO, BoardResponse } from 'src/app/core/models/project-manager.model';
import { ChangeLanguageService } from 'src/app/core/services/changeLanguage.service';
import { HTTPService } from 'src/app/core/services/http.service';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { CreateBoardService } from '../../services/create-board-services';
import { SetUserServices } from '../../services/set-user-services';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent implements OnInit {
  isCreationFormBoardOpen: boolean | null = null;

  formCreateBoard!: FormGroup;

  usersName: string[] = [];

  allUsers: string[] = [];

  owner: string = '';

  constructor(
    public translate: TranslateService,
    private languageService: ChangeLanguageService,
    private createFormService:CreateBoardService,
    private httpService: HTTPService,
    private setUserServices: SetUserServices,
    private localStorageService: LocalStorageService,
  ) {
    this.formCreateBoard = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
    });
  }

  ngOnInit(): void {
    this.languageService.language$.subscribe((value) => this.translate.use(value));
    this.createFormService.isCreateBoardOpen$.subscribe((e) => {
      this.isCreationFormBoardOpen = e;
    });

    this.setUserServices.userName$.subscribe((userName) => {
      if (!this.usersName.includes(userName)) {
        this.usersName.push(userName);
      }
    });

    this.createFormService.isCreateBoardOpen$.subscribe((e) => {
      if (!e) {
        this.usersName = [];
      }
    });
    this.httpService.getAllUsers().subscribe((users) => {
      users.filter((user) => {
        if (!this.allUsers.includes(user.name)) {
          this.allUsers.push(user.name);
        }

        return this.allUsers;
      });
    });
    this.owner = (JSON.stringify(this.localStorageService.getFromLocalStorage('login'))).replace(/["']/g, '');
  }

  closeCreateBoard() {
    this.createFormService.stateFormBoard(false);
    this.formCreateBoard.reset();
  }

  createBoard() {
    const formBoard: BoardDTO = {
      title: this.formCreateBoard.value.title,
      owner: this.owner,
      users: this.usersName,
    };

    this.createFormService.stateFormBoard(false);

    this.formCreateBoard.reset();

    this.httpService.createBoard(formBoard).subscribe((e) => {
      this.createFormService.updateBoards(e);
    });
  }

  removeUser(userName: string) {
    this.usersName = this.usersName.filter((e) => e !== userName);
  }
}
