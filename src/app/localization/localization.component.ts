import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.scss'],
})
export class LocalizationComponent {
  language = 'en';

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
    let browserLang = 'en';
    if (localStorage.getItem('lang')) {
      browserLang = localStorage.getItem('lang')!;
    } else {
      browserLang = translate.getBrowserLang()!;
    }
    translate.use(browserLang!.match(/en|ru/) ? browserLang! : 'en');
    console.log(browserLang);
    this.language = browserLang!;
  }

  onClick(): void {
    if (this.language === 'en') {
      this.language = 'ru';
    } else {
      this.language = 'en';
    }
    this.translate.use(this.language);
    localStorage.setItem('lang', this.language);
  }
}
