import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
  ],
})
export class HomePageComponent {
  public panelOpenState = false;
  public authService = inject(AuthService);
}
