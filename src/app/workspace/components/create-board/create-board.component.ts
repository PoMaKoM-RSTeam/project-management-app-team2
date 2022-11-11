import {
  Component, OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BoardDTO } from 'src/app/core/models/project-manager.model';
import { ChangeLanguageService } from 'src/app/core/services/changeLanguage.service';
import { CreateBoardService } from '../../services/create-board-services';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent implements OnInit {
  isCreationFormBoardOpen: boolean | null = null;

  formCreateBoard!: FormGroup;

  constructor(
    public translate: TranslateService,
    private languageService: ChangeLanguageService,
    private createFormService:CreateBoardService,
  ) {
    this.formCreateBoard = new FormGroup({
      title: new FormControl(null, Validators.required),
      owner: new FormControl(null, Validators.required),
      users: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.languageService.language$.subscribe((value) => this.translate.use(value));
    this.createFormService.isCreateBoardOpen$.subscribe((e) => {
      this.isCreationFormBoardOpen = e;
    });
  }

  closeCreateBoard() {
    this.createFormService.stateFormBoard(false);
  }

  createBoard() {
    const formBoard: BoardDTO = {
      title: this.formCreateBoard.value.title,
      owner: this.formCreateBoard.value.owner,
      users: this.formCreateBoard.value.users.split(','),
    };
    this.createFormService.stateFormBoard(false);
    this.formCreateBoard.reset();
    this.createFormService.postBoard(formBoard);
  }
}
