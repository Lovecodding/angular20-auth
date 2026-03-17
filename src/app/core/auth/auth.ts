import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { catchError, tap, throwError } from "rxjs";

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  #httpClient = inject(HttpClient);
  #token = signal<null | string>(this.#getStoredToken());
  #isLoading = signal<boolean>(false);
  #errorMessage = signal<string | null>(null);

  readonly token = this.#token.asReadonly();
  readonly isLoading = this.#isLoading.asReadonly();
  readonly errorMessage = this.#errorMessage.asReadonly();

  #getStoredToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  #setStoredToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  #clearStoredToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  login(username: string, password: string) {
    this.#isLoading.set(true);
    this.#errorMessage.set(null);

    return this.#httpClient.post<AuthResponse>(`https://dummyjson.com/auth/login`,
      { username, password }
    ).pipe(
      tap(({ accessToken }) => {
        this.#token.set(accessToken);
        this.#setStoredToken(accessToken);
        this.#isLoading.set(false);
      }),
      catchError(error => {
        this.#isLoading.set(false);
        this.#errorMessage.set('Invalid username or password');
        return throwError(() => error);
      })
    );
  }

  logout() {
    this.#token.set(null);
    this.#clearStoredToken();
    this.#errorMessage.set(null);
  }

  isAuthenticated(): boolean {
    return this.#token() !== null;
  }

  authenticateDummyUser() {
    return this.#httpClient.post<AuthResponse>(`https://dummyjson.com/auth/login`,
      {
        username: 'emilys',
        password: 'emilyspass'
      }
    ).pipe(
      tap(({ accessToken }) => {
        this.#token.set(accessToken);
        this.#setStoredToken(accessToken);
      })
    );
  }
}