import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { Client } from '../../../../environments/client';
import { Navigator } from '../../../../environments/navigator';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Link } from '../../models/link';

@Component({
  selector: 'app-navlist',
  templateUrl: './navlist.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    RouterLink,
    RouterLinkActive,
  ],
})
export class NavlistComponent {
  @Input()
  buttonColor!: String;

  @Input()
  buttonTooltip!: String;

  @Input()
  buttonIcon!: String;

  @Input()
  links!: Link[];

  private userService = inject(AuthService);
  private router = inject(Router);
  private navigator = inject(Navigator);

  isPrimaryButtonHighlighted(): boolean {
    // Check if the current route matches any of the link URLs
    return this.links.some((link) =>
      this.router.isActive(link.url as string, true)
    );
  }

  handlePrimaryButtonClick(event: Event) {
    event.preventDefault(); // Prevent default redirection on primary button click
    event.stopPropagation();
    // You can add specific actions for the primary button here if needed
  }
}
