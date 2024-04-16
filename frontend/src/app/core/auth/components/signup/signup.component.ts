import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
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

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
})
export class SignupComponent {
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private navigator = inject(Navigator);

  public registerForm!: FormGroup;
  public registerFormControls!: string[];
  public hidePassword = true;

  @Output()
  cancelRegister = new EventEmitter();

  ngOnInit() {
    this.createForm();
    this.registerFormControls = this.loopThroughFormControls();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  loopThroughFormControls() {
    if (this.registerForm) {
      const controlKeys = Object.keys(this.registerForm.controls);
      return controlKeys;
    }
    return [];
  }

  register() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      this.authService.register(formData).subscribe(
        (response) => {
          this.navigator.getHome(100);
        },
        (error) => {
          this.notFound();
        }
      );

      this.router.navigateByUrl(Client.home());
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.router.navigateByUrl(Client.home());
  }

  notFound() {
    this.cancelRegister.emit(false);
    this.router.navigateByUrl('/404');
  }
}
