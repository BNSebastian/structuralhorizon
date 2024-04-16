import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

import { Client } from '../../../../environments/client';
import { AuthService } from '../../../core/auth/services/auth.service';
import {
  adminLinks,
  authenticatedLinks,
  Link,
  publicLinks,
} from '../../models/link';
import { NavitemComponent } from '../navitem/navitem.component';
import { NavlistComponent } from '../navlist/navlist.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    NavitemComponent,
    NavlistComponent,
  ],
})
export class NavbarComponent {
  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 1025px)')
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  private router = inject(Router);
  public authService = inject(AuthService);

  public navbarOpen = false;
  public publicLinks: Link[] = publicLinks;
  public userLinks: Link[] = authenticatedLinks;
  public adminLinks: any = adminLinks;

  public isAuthenticated: boolean = false;
  public isAdmin: boolean = false;

  ngOnInit() {
    this.getStatus();
  }

  getStatus() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated != null) {
      console.log('user is authenticated');
      this.authService.isAdmin().subscribe({
        next: (response) => {
          this.isAdmin = response;
        },
        error: (error) => {
          error;
        },
      });
    }
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
    console.log(`hamburger pressed, the flag value is ${this.navbarOpen}`);
  }

  logout() {
    this.authService.clearUser();
    this.router.navigateByUrl(Client.home());
  }
}
