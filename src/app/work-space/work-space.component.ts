import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChangeLanguageService } from '../core/services/changeLanguage.service';

@Component({
  selector: 'app-work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.scss'],
})
export class WorkSpaceComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    private languageService: ChangeLanguageService,
  ) { }

  ngOnInit(): void {
    this.languageService.language$.subscribe((value) => this.translate.use(value));
  }
}
