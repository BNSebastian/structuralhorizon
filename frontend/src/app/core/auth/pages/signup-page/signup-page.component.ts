import { Component } from '@angular/core';

import { SignupComponent } from '../../components/signup/signup.component';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  standalone: true,
  imports: [SignupComponent],
})
export class SignupPageComponent {}
