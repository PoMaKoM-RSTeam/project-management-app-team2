import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class SetUserServices {
  private userName$$ = new Subject<string>();

  userName$ = this.userName$$.asObservable();

  setUser(users: string) {
    this.userName$$.next(users);
  }
}
