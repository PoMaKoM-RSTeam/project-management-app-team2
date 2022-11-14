import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  isCollapsed = false;

  constructor(private navigationService: NavigationService) { }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    this.navigationService.updateCollaps(this.isCollapsed);
  }
}
