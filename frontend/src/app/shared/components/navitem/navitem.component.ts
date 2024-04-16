import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { Client } from '../../../../environments/client';
import { Navigator } from '../../../../environments/navigator';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Link } from '../../models/link';

@Component({
  selector: 'app-navitem',
  templateUrl: './navitem.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterLink,
    RouterLinkActive,
  ],
})
export class NavitemComponent {
  @Input()
  link!: Link;

  private userService = inject(AuthService);
  private navigator = inject(Navigator);
  private router = inject(Router);

  handleClick(event: Event, linkName: string) {
    if (linkName === 'logout') {
      event.preventDefault();
      event.stopPropagation();
      this.logout();
    }
  }

  logout() {
    this.userService.clearUser();
    this.navigator.getHome(150);
  }
}
