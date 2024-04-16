import { Component, Inject, inject } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule
} from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';

import { Client } from '../../../../../environments/client';
import { TurbineUpdateDto } from '../turbine';
import { TurbineService } from '../turbine.service';

@Component({
  selector: 'app-turbine-update',
  templateUrl: './turbine-update.component.html',
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
export class TurbineUpdateComponent {
  public form!: FormGroup;
  public formData!: TurbineUpdateDto;

  private formBuilder = inject(FormBuilder);
  private service = inject(TurbineService);

  constructor(@Inject(MAT_DIALOG_DATA) public dialogInput: any) {
    this.buildForm();
    this.getById(dialogInput);
  }

  getById(id: string) {
    this.service.getById(id).subscribe({
      next: (response) => {
        this.formData = response;
        this.updateForm();
      },
      error: (error) => {
        error;
      },
    });
  }

  update(request: TurbineUpdateDto) {
    console.log(request);
    this.service.update(request).subscribe({
      next: () => {},
      error: (error) => {
        error;
      },
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: new FormControl({ value: '', disabled: false }),
      number: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(300),
      ]),
      location: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(300),
      ]),
    });
  }

  updateForm() {
    this.form.patchValue({
      id: this.formData.id,
      number: this.formData.number,
      location: this.formData.location,
    });
  }

  submitForm() {
    if (this.form.valid) {
      const request: TurbineUpdateDto = {
        id: this.form.value.id,
        number: this.form.value.number,
        location: this.form.value.location,
      };
      this.update(request);
    }
  }
}
