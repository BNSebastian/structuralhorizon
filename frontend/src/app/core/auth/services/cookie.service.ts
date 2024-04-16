import { CookieService } from 'ngx-cookie-service';

import { inject, Injectable } from '@angular/core';

import { AuthResponse } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class CustomCookieService {
  private cookieService = inject(CookieService);

  setCookies(user: AuthResponse): void {
    this.cookieService.set('id', user.id);
    this.cookieService.set('email', user.email);
    this.cookieService.set('name', user.name);
    this.cookieService.set('token', 'Bearer ' + user.token);
  }

  removeCookies(): void {
    this.cookieService.deleteAll();
  }

  getUserId(): string {
    const userId: string = this.cookieService.get('id');
    if (userId) {
      console.log(
        `cookieService::getUserId: retrieving user with id: ${userId}`
      );
      return userId;
    } else {
      console.log(`cookieService: getUserId:: failed to retrieve user id`);
      return '';
    }
  }

  getUserEmail(): string {
    return this.cookieService.get('email');
  }

  getUserName(): string {
    return this.cookieService.get('name');
  }

  checkToken(): boolean {
    return this.cookieService.check('token');
  }

  getToken(): string {
    return this.cookieService.get('token');
  }

  destroyToken(): void {
    this.cookieService.delete('token');
  }
}
