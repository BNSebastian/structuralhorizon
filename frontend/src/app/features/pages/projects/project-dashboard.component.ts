import { Component } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';

import { ProjectListComponent } from '../../components/projects/project-list/project-list.component';
import { ProjectSaveComponent } from '../../components/projects/project-save/project-save.component';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  standalone: true,
  imports: [
    MatAccordion,
    MatExpansionModule,
    ProjectListComponent,
    ProjectSaveComponent,
  ],
})
export class ProjectDashboardComponent {}
