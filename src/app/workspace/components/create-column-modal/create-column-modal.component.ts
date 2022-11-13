import {
  Component, EventEmitter, OnInit, Output,
} from '@angular/core';
import {
  FormControl, FormGroup, UntypedFormGroup, Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ChangeLanguageService } from 'src/app/core/services/changeLanguage.service';

@Component({
  selector: 'app-create-column-modal',
  templateUrl: './create-column-modal.component.html',
  styleUrls: ['./create-column-modal.component.scss'],
})
export class CreateColumnModalComponent implements OnInit {
  modalForm!: UntypedFormGroup;

  @Output() createColumn = new EventEmitter<string>();

  @Output() closeOpen = new EventEmitter<boolean>();

  constructor(
    public translate: TranslateService,
    private languageService: ChangeLanguageService,
  ) {
    this.modalForm = new FormGroup({
      modalFormInput: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    });
  }

  ngOnInit(): void {
    this.languageService.language$.subscribe((value) => this.translate.use(value));
  }

  onSubmit() {
    this.createColumn.emit(this.modalForm.value.modalFormInput);
  }

  onCloseModalWindow() {
    this.closeOpen.emit(false);
  }
}
