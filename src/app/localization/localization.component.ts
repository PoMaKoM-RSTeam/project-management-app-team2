import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChangeLanguageService } from '../core/services/changeLanguage.service';

@Component({
  selector: 'app-localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.scss'],
})
export class LocalizationComponent implements OnInit {
  key: string = 'lang';

  constructor(
    public translate: TranslateService,
    private languageService: ChangeLanguageService,
  ) {
    translate.addLangs(['en', 'ru', 'de', 'by']);
    translate.setDefaultLang('en');
    let browserLang = 'en';
    if (this.languageService.getFromLocalStorage(this.key)) {
      browserLang = this.languageService.getFromLocalStorage(this.key)!;
    } else {
      browserLang = translate.getBrowserLang()!;
    }
    this.languageService.updateLanguage(browserLang);
    translate.use(browserLang!.match(/en|ru|de|by/) ? browserLang! : 'en');
  }

  ngOnInit(): void {
    this.languageService.language$.subscribe((value) => this.translate.use(value));
  }

  onChange(value: string): void {
    this.translate.use(value);
    this.languageService.setInLocalStorage(this.key, value);
    this.languageService.updateLanguage(value);
  }
}
