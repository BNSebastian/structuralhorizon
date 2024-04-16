import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { Client } from '../../../../../environments/client';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { CustomCookieService } from '../../../../core/auth/services/cookie.service';
import { ProjectDto } from '../project';
import { ProjectUpdateComponent } from '../project-update/project-update.component';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, MatCardModule, MatPaginatorModule],
})
export class ProjectListComponent {
  public tableData: ProjectDto[] = [];
  public tableColumns: string[] = [
    'name',
    'description',
    'link',
    'update',
    'delete',
  ];
  public isAdmin: boolean = false;
  public currentUsername: string = '';

  public paginatorCount: number = 0;
  public paginatorPageIndex: number = 0;
  public paginatorPageSize: number = 5;
  public paginatorPageSizeOptions: number[] = [5, 10, 25, 50];

  private service = inject(ProjectService);
  private authService = inject(AuthService);
  private cookieService = inject(CustomCookieService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  ngOnInit(): void {
    this.checkIfAdmin();
    this.getCurrentUserName();
    this.getPage(this.paginatorPageIndex, this.paginatorPageSize);
  }

  paginatorEvent(event: PageEvent) {
    this.paginatorPageIndex = event.pageIndex;
    this.paginatorPageSize = event.pageSize;
    this.getPage(this.paginatorPageIndex, this.paginatorPageSize);
  }

  getPage(pageIndex: number, pageSize: number) {
    this.service.getPage(pageIndex, pageSize).subscribe({
      next: (response) => {
        this.tableData = response.content;
        this.paginatorCount = response.totalElements;
      },
      error: (error) => {
        error;
      },
    });
  }

  checkIfAdmin() {
    this.authService.isAdmin().subscribe({
      next: (res) => {
        this.isAdmin = res;
      },
      error: (err) => {
        err;
      },
    });
  }

  getCurrentUserName() {
    this.currentUsername = this.cookieService.getUserName();
  }

  canAccess(project: ProjectDto) {
    // check if user is admin
    if (this.isAdmin) {
      return true;
    }

    // check if user belongs to project
    for (const user of project.users) {
      if (user.name === this.currentUsername) {
        return true;
      }
    }

    return false;
  }

  link(project: ProjectDto) {
    this.router.navigate([`${Client.getProject(project.id)}`]);
  }

  edit(id: string) {
    const dialogRef = this.dialog.open(ProjectUpdateComponent, {
      data: id,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getPage(this.paginatorPageIndex, this.paginatorPageSize);
    });
  }

  delete(id: string) {
    this.service.delete(id).subscribe({
      next: () => {
        this.getPage(this.paginatorPageIndex, this.paginatorPageSize);
      },
      error: (error) => {
        error;
      },
    });
  }

  handleSaveSuccess() {
    this.getPage(this.paginatorPageIndex, this.paginatorPageSize);
  }
}
