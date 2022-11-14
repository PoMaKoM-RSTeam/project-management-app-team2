import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  SignInDTO,
  SignInResponse,
  SignUpDTO,
  SignUpResponse,
  StorageKeys,
  Routes,
} from '../../core/models/project-manager.model';
import { LocalStorageService } from '../../core/services/localStorage.service';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private isAuthorized$$ = new BehaviorSubject(false);

  private userName$$ = new BehaviorSubject('');

  public isAuthorized$ = this.isAuthorized$$.asObservable();

  private userName$ = this.userName$$.asObservable();

  redirectUrl: string | null = null;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) { }

  signUp(newUser: SignUpDTO) {
    const login$: Observable<SignUpResponse> = this.http.post<SignUpResponse>(`${Routes.SignUp}`, newUser);
    login$.subscribe({
      next: () => {
        const user: SignInDTO = { login: newUser.login, password: newUser.password };
        this.signIn(user);
      },
      error: () => this.isAuthorized$$.next(false),
    });
    return login$;
  }

  signIn(user: SignInDTO) {
    const login$: Observable<SignInResponse> = this.http.post<SignInResponse>(`${Routes.SignIn}`, user);
    login$.subscribe({
      next: (result) => {
        this.isAuthorized$$.next(true);
        this.userName$$.next(user.login);
        this.localStorageService.setInLocalStorage(StorageKeys.Token, result.token);
        this.localStorageService.setInLocalStorage(StorageKeys.Login, user.login);
        this.router.navigateByUrl('workspace');
      },
      error: () => {
        this.isAuthorized$$.next(false);
        this.userName$$.next('');
      },
    });
    return login$;
  }

  logout() {
    this.isAuthorized$$.next(false);
  }

  isAuthorized() {
    return this.isAuthorized$$.value;
  }
}
