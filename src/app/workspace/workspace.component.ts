import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChangeLanguageService } from '../core/services/changeLanguage.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {
  nameBoard: string | null = null;

  constructor(
    public translate: TranslateService,
    private languageService: ChangeLanguageService,
  ) { }

  ngOnInit(): void {
    this.languageService.language$.subscribe((value) => this.translate.use(value));

    this.nameBoard = 'NAME';
  }

  // eslint-disable-next-line class-methods-use-this
  deleteBoard() {

  }
}
