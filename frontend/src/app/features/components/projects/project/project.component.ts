import { DatePipe } from '@angular/common'; // Import DatePipe
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

import { ActivityDto } from '../../activities/activity';
import { WarningSaveComponent } from '../../warnings/warning-save/warning-save.component';
import { ProjectDto } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  standalone: true,
  imports: [
    DatePipe,
    MatAccordion,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
  ],
})
export class ProjectComponent {
  public project!: ProjectDto;
  public data: ActivityDto[] = [];

  private activatedRoute = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.getProjectById(this.getId());
  }

  getId(): string {
    var idParam = this.activatedRoute.snapshot.paramMap.get('id');
    return idParam ? idParam : 'not-found';
  }

  getProjectById(id: string) {
    this.projectService.getById(id).subscribe({
      next: (response) => {
        this.project = response;
        this.data = response.activities;
      },
      error: (error) => {
        error;
      },
    });
  }

  edit(id: string) {
    const dialogRef = this.dialog.open(WarningSaveComponent, {
      data: id,
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  handleSaveSuccess() {
    this.getProjectById(this.getId());
  }
}
