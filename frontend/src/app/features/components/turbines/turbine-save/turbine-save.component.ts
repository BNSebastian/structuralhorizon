import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TypeDto } from '../../types/type';
import { TurbineCreateDto } from '../turbine';
import { TurbineService } from '../turbine.service';

@Component({
  selector: 'app-turbine-save',
  templateUrl: './turbine-save.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class TurbineSaveComponent {
  @Output() onSaveSuccess: EventEmitter<void> = new EventEmitter<void>();

  public form!: FormGroup;
  public formData!: TypeDto;
  private formBuilder = inject(FormBuilder);

  private service = inject(TurbineService);

  ngOnInit() {
    this.buildForm();
  }

  save(request: TurbineCreateDto) {
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

  submitForm() {
    if (this.form.valid) {
      const request: TurbineCreateDto = {
        number: this.form.value.number,
        location: this.form.value.location,
      };
      this.save(request);
    }
  }

  cancel() {
    this.form.reset();
  }
}
