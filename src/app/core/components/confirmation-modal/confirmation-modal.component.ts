import { Component, Input } from '@angular/core';
import { ChangeLanguageService } from '../../services/changeLanguage.service';
// import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  isVisible = false;

  @Input() modalText: string = '';

  constructor(
    private languageService: ChangeLanguageService,
  ) {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
