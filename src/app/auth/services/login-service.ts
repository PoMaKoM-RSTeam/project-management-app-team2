import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoginService {
  private authSubject = new BehaviorSubject<any>('');

  auth = this.authSubject.asObservable();

  getDateAuth(date: any) {
    this.authSubject.next(localStorage.setItem('login', date));
    console.log(date);
  }
}
