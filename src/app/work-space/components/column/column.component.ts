import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl, FormGroup, UntypedFormGroup, Validators,
} from '@angular/forms';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() column: any;

  title = 'Title';

  isTitleClicked = false;

  inputForm!: UntypedFormGroup;

  constructor() {
    this.inputForm = new FormGroup({
      myInput: new FormControl(this.title, Validators.required),
    });
  }

  ngOnInit(): void {
    console.log(this.title);
  }

  onTitleClick(): void {
    this.isTitleClicked = true;
  }

  onSubmitForm(): void {
    this.isTitleClicked = false;
  }
}
