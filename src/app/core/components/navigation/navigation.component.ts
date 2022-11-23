import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  isCollapsed = false;

  isAuth: boolean | null = null;

  url: string = '';

  constructor(
    private navigationService: NavigationService,
    private isAuthService: AuthService,
    public route: Router,
  ) { }

  ngOnInit() {
    this.isAuthService.isAuthorized$.subscribe((e) => {
      this.isAuth = e;
    });
    this.navigationService.navUrl.subscribe((url) => {
      this.url = url;
    });
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    this.navigationService.updateCollaps(this.isCollapsed);
  }
}
