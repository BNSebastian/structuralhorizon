import { catchError, map, Observable, of, throwError } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Api } from '../../../../environments/api';
import { AuthRequest, AuthResponse, RegisterRequest } from '../models/auth';
import { CustomCookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = Api.auth;
  private http = inject(HttpClient);
  private cookieService = inject(CustomCookieService);

  register(entity: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/register`, entity)
      .pipe(
        map((response) => {
          this.cookieService.setCookies(response);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  authenticate(entity: AuthRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/authenticate`, entity)
      .pipe(
        map((response) => {
          this.cookieService.setCookies(response);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getRole(id: string): Observable<String> {
    return this.http
      .get<String>(`${this.baseUrl}/getRole?id=${id}`)
      .pipe(catchError(this.handleError));
  }

  isAdmin(): Observable<boolean> {
    let id = this.cookieService.getUserId();
    if (id !== '') {
      return this.getRole(this.cookieService.getUserId()).pipe(
        map((role) => role === 'ADMIN'),
        catchError(this.handleError)
      );
    } else {
      return of(false);
    }
  }

  isModerator(): Observable<boolean> {
    let id = this.cookieService.getUserId();
    if (id !== '') {
      return this.getRole(this.cookieService.getUserId()).pipe(
        map((role) => role === 'MODERATOR'),
        catchError(this.handleError)
      );
    } else {
      return of(false);
    }
  }

  isAuthenticated() {
    return this.cookieService.checkToken();
  }

  getAuthToken() {
    return this.cookieService.getToken();
  }

  clearUser() {
    this.cookieService.removeCookies();
  }

  /**
   * Handles errors that occur during HTTP requests.
   *
   * @param error - The error that occurred during the HTTP request.
   * @returns An Observable that emits an error.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
