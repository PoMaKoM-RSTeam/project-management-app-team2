import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterString$$ = new BehaviorSubject<string>('');

  filterInputValue$ = this.filterString$$.asObservable();

  updateFilterString(inputValue: string) {
    this.filterString$$.next(inputValue);
  }
}
