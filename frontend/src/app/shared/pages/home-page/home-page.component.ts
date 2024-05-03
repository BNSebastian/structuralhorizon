import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../../core/auth/services/auth.service';
import { MathJaxParagraphComponent } from '../../components/math-jax-paragraph/math-jax-paragraph.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MathJaxParagraphComponent,
  ],
})
export class HomePageComponent {
  public panelOpenState = false;
  public authService = inject(AuthService);
  public test: number = 3;
  public firstEq: string = `Just testing how well a random equation \(${this.test} + y^2 = z^2\) in the middle of a sentence works.`;
}
