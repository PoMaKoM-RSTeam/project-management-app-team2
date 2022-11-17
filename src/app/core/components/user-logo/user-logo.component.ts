import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-logo',
  templateUrl: './user-logo.component.html',
  styleUrls: ['./user-logo.component.scss'],
})
export class UserLogoComponent {
  @Input() userName!: string | undefined;
}
