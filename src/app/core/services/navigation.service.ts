import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private isCollapsed = new BehaviorSubject<boolean>(false);

  private navigateUrl = new BehaviorSubject<string>('');

  navUrl = this.navigateUrl.asObservable();

  collaps = this.isCollapsed.asObservable();

  updateCollaps(bool: boolean) {
    this.isCollapsed.next(bool);
  }

  updateUrl(url: string) {
    this.navigateUrl.next(url);
  }
}
