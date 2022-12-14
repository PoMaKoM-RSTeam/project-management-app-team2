/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getFromLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  setInLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  clearStorage() {
    localStorage.clear();
  }
}
