import { Component } from '@angular/core';

import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  standalone: true,
  imports: [LoginComponent],
})
export class LoginPageComponent {}
