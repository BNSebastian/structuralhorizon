import { Component, inject, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { WarningCreateDto } from '../warning';
import { WarningService } from '../warning.service';

@Component({
  selector: 'app-warning-save',
  templateUrl: './warning-save.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class WarningSaveComponent {
  private service = inject(WarningService);
  constructor(@Inject(MAT_DIALOG_DATA) public dialogInput: any) {
    this.buildForm();
    this.updateForm();
  }

  public form!: FormGroup;
  private formBuilder = inject(FormBuilder);

  buildForm() {
    this.form = this.formBuilder.group({
      turbine: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(300),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(300),
      ]),
    });
  }

  updateForm() {
    this.form.patchValue({
      turbine: this.dialogInput,
    });
  }

  submitForm() {
    if (this.form.valid) {
      const request: WarningCreateDto = {
        turbine: this.form.value.turbine,
        description: this.form.value.description,
      };
      this.save(request);
    }
  }

  save(request: WarningCreateDto) {
    this.service.save(request).subscribe({
      next: () => {},
      error: (error) => {
        error;
      },
    });
  }
}
