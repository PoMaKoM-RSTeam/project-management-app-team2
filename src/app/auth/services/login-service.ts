import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoginService {
  private authSubject = new BehaviorSubject<any>('');

  auth = this.authSubject.asObservable();

  getDateAuth(date: any) {
    localStorage.setItem('login', date);
    this.authSubject.next(date);
    console.log(date);
  }
}
