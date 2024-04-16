import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Client } from '../../../environments/client';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private userService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean {
    if (this.userService.isAuthenticated()) {
      return true;
    } else {
      console.log('Thou shalt not pass!');
      this.router.navigate([Client.getUnauthorizedAccessError()]);
      return false;
    }
  }
}
