import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private isCollapsed = new BehaviorSubject<boolean>(false);

  collaps = this.isCollapsed.asObservable();

  updateCollaps(bool: boolean) {
    this.isCollapsed.next(bool);
  }
}
