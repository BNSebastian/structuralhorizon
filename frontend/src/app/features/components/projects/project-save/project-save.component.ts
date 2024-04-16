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

import { ProjectCreateDto, ProjectDto } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-save',
  templateUrl: './project-save.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class ProjectSaveComponent {
  @Output() onSaveSuccess: EventEmitter<void> = new EventEmitter<void>();

  public form!: FormGroup;
  public formData!: ProjectDto;
  private formBuilder = inject(FormBuilder);

  private service = inject(ProjectService);

  ngOnInit() {
    this.buildForm();
  }

  save(request: ProjectCreateDto) {
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
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(300),
      ]),
    });
  }

  submitForm() {
    if (this.form.valid) {
      const request: ProjectCreateDto = {
        name: this.form.value.name,
        description: this.form.value.description,
      };
      this.save(request);
    }
  }

  cancel() {
    this.form.reset();
  }
}
