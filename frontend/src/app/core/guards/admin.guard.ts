import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Client } from '../../../environments/client';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAdmin().pipe(
      map((isAdmin: boolean) => {
        if (isAdmin) {
          return true;
        } else {
          console.log('Thou shalt not pass!');
          this.router.navigate([Client.getUnauthorizedAccessError()]);
          return false;
        }
      }),
      catchError((error) => {
        console.error('Error checking admin status:', error);
        return of(false);
      })
    );
  }
}
