import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import {
  FormControl, FormGroup, UntypedFormGroup, Validators,
} from '@angular/forms';
import { Column } from '../../pages/board/board.component';
import { TranslateService } from '@ngx-translate/core';
import { ColumnResponse } from 'src/app/core/models/project-manager.model';
import { ChangeLanguageService } from 'src/app/core/services/changeLanguage.service';


@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() column!: ColumnResponse;

  @Output() deleteColumn = new EventEmitter<string>();

  title = 'Title';

  prevTitle = '';

  isTitleClicked = false;

  inputForm!: UntypedFormGroup;

  constructor(
    public translate: TranslateService,
    private languageService: ChangeLanguageService,
  ) {
    this.inputForm = new FormGroup({
      myInput: new FormControl(this.title, [Validators.required, Validators.maxLength(15)]),
    });
  }

  ngOnInit(): void {
    this.languageService.language$.subscribe((value) => this.translate.use(value));
  }

  onTitleClick(): void {
    this.prevTitle = this.column.title;
    this.isTitleClicked = true;
  }

  onSubmitForm(): void {
    if (this.column.title) {
      this.isTitleClicked = false;
    }
  }

  onCancelSubmit(): void {
    this.column.title = this.prevTitle;
    this.isTitleClicked = false;
  }

  onDeleteColumn(col: string) {
    this.deleteColumn.emit(col);
  }
}
