import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  isCollapsed = false;

  isAuth: boolean | null = null;

  constructor(
    private navigationService: NavigationService,
    private isAuthService: AuthService,
  ) { }

  ngOnInit() {
    this.isAuthService.isAuthorized$.subscribe((e) => {
      this.isAuth = e;
    });
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    this.navigationService.updateCollaps(this.isCollapsed);
  }
}
