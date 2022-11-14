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

  @Input() isButton: boolean = true;

  @Input() onDelete!: () => void;

  constructor(
    private languageService: ChangeLanguageService,
  ) {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.onDelete();
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
