/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChangeLanguageService {
  private pagesLanguage$ = new BehaviorSubject<string>('en');

  language$ = this.pagesLanguage$.asObservable();

  getFromLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  setInLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  updateLanguage(text: string) {
    this.pagesLanguage$.next(text);
  }


}
