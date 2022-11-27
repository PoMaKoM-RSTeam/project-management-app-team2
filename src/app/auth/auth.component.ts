import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChangeLanguageService } from '../core/services/changeLanguage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    private languageService: ChangeLanguageService,
  ) { }

  ngOnInit(): void {
    this.languageService.language$.subscribe((value) => this.translate.use(value));
  }
}
