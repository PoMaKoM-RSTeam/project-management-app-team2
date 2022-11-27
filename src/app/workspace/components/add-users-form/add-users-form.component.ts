import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChangeLanguageService } from 'src/app/core/services/changeLanguage.service';
import { SetUserServices } from '../../services/set-user-services';

@Component({
  selector: 'app-add-users-form',
  templateUrl: './add-users-form.component.html',
  styleUrls: ['./add-users-form.component.scss'],
})
export class AddUsersFormComponent implements OnInit {
  @Input() userName: string[] | null = null;

  constructor(
    public translate: TranslateService,
    private languageService: ChangeLanguageService,
    private setUserServices: SetUserServices,
  ) {}

  ngOnInit() {
    this.languageService.language$.subscribe((value) => this.translate.use(value));
  }

  clickUser(e: string) {
    this.setUserServices.setUser(e);
  }
}
