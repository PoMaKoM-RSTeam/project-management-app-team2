import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SignUpResponse } from 'src/app/core/models/project-manager.model';
import { ChangeLanguageService } from 'src/app/core/services/changeLanguage.service';
import { GetUsersServices } from '../../services/get-users-services';
import { SetUserServices } from '../../services/set-user-services';

@Component({
  selector: 'app-add-users-form',
  templateUrl: './add-users-form.component.html',
  styleUrls: ['./add-users-form.component.scss'],
})
export class AddUsersFormComponent implements OnInit {
  userName: FormGroup;

  userStorage: SignUpResponse[] = [];

  constructor(
    public translate: TranslateService,
    private languageService: ChangeLanguageService,
    private getUsersServices: GetUsersServices,
    private setUserServices: SetUserServices,
  ) {
    this.userName = new FormGroup({
      name: new FormControl('Выберите пользователя'),
    });
  }

  ngOnInit() {
    this.languageService.language$.subscribe((value) => this.translate.use(value));

    this.getUsersServices.storageUsers$.subscribe((e) => {
      this.userStorage = e;
    });

    this.userName.controls['name'].valueChanges.subscribe((e) => {
      this.setUserServices.setUser(e.name);
    });
  }

  addUsers() {
    this.getUsersServices.storageUsers$.subscribe((e) => {
      this.userStorage = e;
    });
  }

  clickUser(e: string) {
    this.setUserServices.setUser(e);
  }
}
