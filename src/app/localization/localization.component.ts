import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '../core/services/localstorage.service';

@Component({
  selector: 'app-localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.scss'],
})
export class LocalizationComponent {
  key: string = 'lang';

  constructor(
    public translate: TranslateService,
    private localStorageService: LocalStorageService,
  ) {
    translate.addLangs(['en', 'ru', 'de', 'by']);
    translate.setDefaultLang('en');
    let browserLang = 'en';
    if (this.localStorageService.getFromLocalStorage(this.key)) {
      browserLang = this.localStorageService.getFromLocalStorage(this.key)!;
    } else {
      browserLang = translate.getBrowserLang()!;
    }
    translate.use(browserLang!.match(/en|ru|de|by/) ? browserLang! : 'en');
  }

  onChange(value: string): void {
    this.translate.use(value);
    this.localStorageService.setInLocalStorage(this.key, value);
  }
}
