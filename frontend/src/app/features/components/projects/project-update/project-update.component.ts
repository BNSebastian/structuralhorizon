import { Component, inject, Inject, Input } from '@angular/core';
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

import { UserDto } from '../../../../core/auth/models/user';
import { UserService } from '../../../../core/auth/services/user.service';
import { TurbineDto } from '../../turbines/turbine';
import { TurbineService } from '../../turbines/turbine.service';
import { ProjectDto, ProjectUpdateDto } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
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
export class ProjectUpdateComponent {
  public form!: FormGroup;
  public formData!: ProjectDto;
  public users: UserDto[] = [];
  public turbines: TurbineDto[] = [];

  private formBuilder = inject(FormBuilder);
  private service = inject(ProjectService);
  private userService = inject(UserService);
  private turbineService = inject(TurbineService);

  constructor(@Inject(MAT_DIALOG_DATA) public dialogInput: any) {
    this.getAllUsers();
    this.getAllTurbines();
    this.getById(this.dialogInput);
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: new FormControl({ value: '', disabled: false }),
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

  updateForm() {
    this.form.patchValue({
      id: this.formData.id,
      name: this.formData.name,
      description: this.formData.description,
    });
  }

  submitForm() {
    if (this.form.valid) {
      const request: ProjectUpdateDto = {
        id: this.form.value.id,
        name: this.form.value.name,
        description: this.form.value.description,
      };
      this.update(request);
    }
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

  update(request: ProjectUpdateDto) {
    this.service.update(request).subscribe({
      next: () => {},
      error: (error) => {
        error;
      },
    });
  }

  getAllUsers() {
    this.userService.getAll().subscribe({
      next: (response) => {
        this.users = response.sort((a, b) => {
          // Convert names to lowercase for case-insensitive sorting
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();

          if (nameA < nameB) {
            return -1; // Name A comes before Name B
          }
          if (nameA > nameB) {
            return 1; // Name A comes after Name B
          }
          return 0; // Names are equal
        });
      },
      error: (error) => {
        error;
      },
    });
  }

  userBelongsToProject(user: UserDto): boolean {
    return user.projects.some((project) => project === this.dialogInput);
  }

  addUserToProject(userId: string) {
    this.service.addUserToProject(this.dialogInput, userId).subscribe({
      next: () => {
        this.getAllUsers();
      },
      error: (error) => {
        error;
      },
    });
  }

  removeUserFromProject(userId: string) {
    this.service.removeUserFromProject(this.dialogInput, userId).subscribe({
      next: () => {
        this.getAllUsers();
      },
      error: (error) => {
        error;
      },
    });
  }

  getAllTurbines() {
    this.turbineService.getAll().subscribe({
      next: (response) => {
        this.turbines = response;
      },
      error: (error) => {
        error;
      },
    });
  }

  turbineBelongsToProject(turbine: TurbineDto): boolean {
    return turbine.projects.some((project) => project === this.dialogInput);
  }

  addTurbineToProject(turbineId: string) {
    this.service.addTurbineToProject(this.dialogInput, turbineId).subscribe({
      next: () => {
        this.getAllTurbines();
      },
      error: (error) => {
        error;
      },
    });
  }

  removeTurbineFromProject(turbineId: string) {
    this.service
      .removeTurbineFromProject(this.dialogInput, turbineId)
      .subscribe({
        next: () => {
          this.getAllTurbines();
        },
        error: (error) => {
          error;
        },
      });
  }
}
