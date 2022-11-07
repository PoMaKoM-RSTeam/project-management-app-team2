import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ChangeLanguageService } from 'src/app/core/services/changeLanguage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  loginStorage: string | null = null;

  constructor(
    private rout: Router,
    public translate: TranslateService,
    private languageService: ChangeLanguageService,
  ) {}

  ngOnInit() {
    this.loginStorage = localStorage.getItem('login');
    this.languageService.language$.subscribe((value) => this.translate.use(value));
  }

  logout() {
    localStorage.removeItem('login');
    this.rout.navigate(['/auth/login']);
  }
}
