import { Component } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';

import { ActivitySaveComponent } from '../../components/activities/activity-save/activity-save.component';
import { ProjectComponent } from '../../components/projects/project/project.component';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  standalone: true,
  imports: [
    MatAccordion,
    MatExpansionModule,
    ActivitySaveComponent,
    ProjectComponent,
  ],
})
export class ProjectPageComponent {}
