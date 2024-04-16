import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

import { Client } from '../../../../../environments/client';
import { Navigator } from '../../../../../environments/navigator';
import { AuthService } from '../../services/auth.service';
import { CustomCookieService } from '../../services/cookie.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private cookieService = inject(CustomCookieService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private navigator = inject(Navigator);

  public loginForm!: FormGroup;
  public hidePassword = true;

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  authenticate() {
    this.cookieService.removeCookies();

    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.authService.authenticate(formData).subscribe({
        next: () => {
          this.navigator.getHome(1000);
        },
        error: () => {
          this.notFound();
        },
      });
    }
  }

  cancel() {
    this.router.navigateByUrl(Client.home());
  }

  notFound() {
    this.router.navigateByUrl('/404');
  }
}
