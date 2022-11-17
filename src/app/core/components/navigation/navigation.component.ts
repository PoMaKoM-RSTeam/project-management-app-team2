import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  isCollapsed = false;

  constructor(private navigationService: NavigationService, public route: Router) { }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    this.navigationService.updateCollaps(this.isCollapsed);
  }
}
