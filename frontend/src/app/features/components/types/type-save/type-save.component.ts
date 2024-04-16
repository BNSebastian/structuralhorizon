import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TypeCreateDto, TypeDto } from '../type';
import { TypeService } from '../type.service';

@Component({
  selector: 'app-type-save',
  templateUrl: './type-save.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class TypeSaveComponent {
  @Output() onSaveSuccess: EventEmitter<void> = new EventEmitter<void>();

  public form!: FormGroup;
  public formData!: TypeDto;
  private formBuilder = inject(FormBuilder);

  private service = inject(TypeService);

  ngOnInit() {
    this.buildForm();
  }

  save(request: TypeCreateDto) {
    this.service.save(request).subscribe({
      next: () => {
        this.onSaveSuccess.emit();
      },
      error: (error) => {
        error;
      },
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(300),
      ]),
    });
  }

  submitForm() {
    if (this.form.valid) {
      const request: TypeCreateDto = {
        name: this.form.value.name,
      };
      this.save(request);
    }
  }

  cancel() {
    this.form.reset();
  }
}
