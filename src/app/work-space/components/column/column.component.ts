import { Component, Input } from '@angular/core';
import {
  FormControl, FormGroup, UntypedFormGroup, Validators,
} from '@angular/forms';
import { Column } from '../board/board.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() column!: Column;

  title = 'Title';

  isTitleClicked = false;

  inputForm!: UntypedFormGroup;

  constructor() {
    this.inputForm = new FormGroup({
      myInput: new FormControl(this.title, Validators.required),
    });
  }

  onTitleClick(): void {
    this.isTitleClicked = true;
  }

  onSubmitForm(): void {
    this.isTitleClicked = false;
  }
}
