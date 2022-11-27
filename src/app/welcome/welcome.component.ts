import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth/services/auth.service';
import { ChangeLanguageService } from '../core/services/changeLanguage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  isAuth: boolean | null = null;

  constructor(
    private isAuthService: AuthService,
    public translate: TranslateService,
    private languageService: ChangeLanguageService,
  ) { }

  ngOnInit() {
    this.isAuthService.isAuthorized$.subscribe((e) => {
      this.isAuth = e;
    });
    this.languageService.language$.subscribe((value) => this.translate.use(value));
  }
}
