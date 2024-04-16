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
import { TypeDto, TypeUpdateDto } from '../type';
import { TypeService } from '../type.service';

@Component({
  selector: 'app-type-update',
  templateUrl: './type-update.component.html',
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
export class TypeUpdateComponent {
  public form!: FormGroup;
  public formData!: TypeDto;
  private formBuilder = inject(FormBuilder);

  private service = inject(TypeService);

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

  update(request: TypeUpdateDto) {
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
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(300),
      ]),
    });
  }

  updateForm() {
    this.form.patchValue({
      id: this.formData.id,
      name: this.formData.name,
    });
  }

  submitForm() {
    if (this.form.valid) {
      const request: TypeDto = {
        id: this.form.value.id,
        name: this.form.value.name,
      };
      this.update(request);
    }
  }
}
