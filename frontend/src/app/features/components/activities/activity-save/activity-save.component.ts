import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';

import { CustomCookieService } from '../../../../core/auth/services/cookie.service';
import { ProjectDto } from '../../projects/project';
import { ProjectService } from '../../projects/project.service';
import { TurbineService } from '../../turbines/turbine.service';
import { TypeDto } from '../../types/type';
import { TypeService } from '../../types/type.service';
import { ActivityCreate } from '../activity';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-activity-save',
  templateUrl: './activity-save.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
})
export class ActivitySaveComponent {
  @Output() onSaveSuccess: EventEmitter<void> = new EventEmitter<void>();

  public userId!: string;
  public projectId!: string;
  public project!: ProjectDto;
  public types: TypeDto[] = [];

  public activityForm!: FormGroup;
  public warningForm!: FormGroup;

  private activityService = inject(ActivityService);
  private cookieService = inject(CustomCookieService);
  private projectService = inject(ProjectService);
  private turbineService = inject(TurbineService);
  private typeService = inject(TypeService);

  private activatedRoute = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);

  ngOnInit() {
    this.buildForm();
    this.userId = this.getUserId();
    this.projectId = this.getProjectId();
    this.getProjectById(this.projectId);
    this.getTypes();
  }

  getUserId() {
    return this.cookieService.getUserId();
  }

  getProjectId(): string {
    var idParam = this.activatedRoute.snapshot.paramMap.get('id');
    return idParam ? idParam : 'not-found';
  }

  getProjectById(projectId: string) {
    this.projectService.getById(projectId).subscribe({
      next: (response) => {
        this.project = response;
        this.updateForm();
      },
      error: (error) => {
        error;
      },
    });
  }

  getTypes() {
    this.typeService.getAll().subscribe({
      next: (response) => {
        this.types = response;
      },
      error: (error) => {
        error;
      },
    });
  }

  buildForm() {
    this.activityForm = this.formBuilder.group({
      projectId: ['', Validators.required],
      turbineId: ['', Validators.required],
      userId: ['', Validators.required],
      typeId: ['', Validators.required],
      description: ['N/A'],
      workPerformed: ['N/A'],
      reasons: ['N/A'],
      startedOn: ['', Validators.required],
      endedOn: ['', Validators.required],
    });

    this.warningForm = this.formBuilder.group({
      turbine: ['', Validators.required],
      description: ['N/A', Validators.required],
    });
  }

  updateForm() {
    this.activityForm.patchValue({
      projectId: this.project.id,
      userId: this.userId,
    });
  }

  submitForm() {
    console.log('Submitting form...');
    if (this.activityForm.valid) {
      const startedOn = new Date(this.activityForm.value.startedOn);
      const endedOn = new Date(this.activityForm.value.endedOn);
      console.log(startedOn, endedOn);

      if (startedOn.getTime() != endedOn.getTime() && startedOn < endedOn) {
        console.log('Form is valid');
        const activity: ActivityCreate = {
          projectId: this.activityForm.value.projectId,
          turbineId: this.activityForm.value.turbineId,
          userId: this.activityForm.value.userId,
          typeId: this.activityForm.value.typeId,
          description: this.activityForm.value.description,
          workPerformed: this.activityForm.value.workPerformed,
          reasons: this.activityForm.value.reasons,
          startedOn: this.activityForm.value.startedOn,
          endedOn: this.activityForm.value.endedOn,
        };

        this.activityService.save(activity).subscribe({
          next: () => {
            console.log('Activity saved successfully.');
            this.onSaveSuccess.emit();
          },
          error: (error) => {
            console.error('Error occurred while saving activity:', error);
          },
        });
      } else {
        console.log('dates are invalid');
        console.log(this.activityForm);
      }
    } else {
      console.log('Form is invalid');
      console.log(this.activityForm);
    }
  }
}
