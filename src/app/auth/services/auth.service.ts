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

  private userLogin$$ = new BehaviorSubject('');

  private userId$$ = new BehaviorSubject('');

  public isAuthorized$ = this.isAuthorized$$.asObservable();

  public userName$ = this.userName$$.asObservable();

  public userLogin$ = this.userLogin$$.asObservable();

  public userId$ = this.userId$$.asObservable();

  redirectUrl: string | null = null;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {
    this.userName$$.next(this.localStorageService.getFromLocalStorage(StorageKeys.UserName) || '');
    this.userLogin$$.next(this.localStorageService.getFromLocalStorage(StorageKeys.Login) || '');
    this.userId$$.next(this.localStorageService.getFromLocalStorage(StorageKeys.UserId) || '');
    this.isAuthorized$$.next(!!this.userLogin$$.value);
  }

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
        this.userLogin$$.next(user.login);
        this.localStorageService.setInLocalStorage(StorageKeys.Token, result.token);
        this.localStorageService.setInLocalStorage(StorageKeys.Login, user.login);
        this.router.navigateByUrl('workspace');
        this.http.get<SignUpResponse[]>(`${Routes.AllUsers}`)
          .subscribe({
            next: (res) => {
              const currentUser = res.filter((item) => item.login === user.login)[0];
              this.localStorageService.setInLocalStorage(StorageKeys.UserId, currentUser._id);
              this.localStorageService.setInLocalStorage(StorageKeys.UserName, currentUser.name);
              this.userId$$.next(currentUser._id);
              this.userName$$.next(currentUser.name);
            },
          });
      },
      error: () => {
        this.logout();
      },
    });
    return login$;
  }

  logout() {
    this.isAuthorized$$.next(false);
    this.userName$$.next('');
    this.userLogin$$.next('');
    this.userId$$.next('');
    this.localStorageService.clearStorage();
    this.router.navigate(['/auth/login']);
  }

  isAuthorized() {
    return this.isAuthorized$$.value;
  }

  setNewLogin(name: string, login: string) {
    this.userName$$.next(name);
    this.userLogin$$.next(name);
    this.localStorageService.setInLocalStorage(StorageKeys.Login, login);
    this.localStorageService.setInLocalStorage(StorageKeys.UserName, name);
  }

  getUserName() {
    return this.userName$$.value;
  }
}
