import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

import { UserDto } from '../../../core/auth/models/user';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CustomCookieService } from '../../../core/auth/services/cookie.service';
import { UserService } from '../../../core/auth/services/user.service';
import { ProjectDto } from '../../components/projects/project';
import { ProjectService } from '../../components/projects/project.service';
import { MonthlyProjectReportComponent } from '../../components/reports/monthly-project-report/monthly-project-report.component';
import { MonthlyTurbineReportComponent } from '../../components/reports/monthly-turbine-report/monthly-turbine-report.component';
import { MonthlyUserReportComponent } from '../../components/reports/monthly-user-report/monthly-user-report.component';
import { TotalProjectReportComponent } from '../../components/reports/total-project-report/total-project-report.component';
import { TotalTurbineReportComponent } from '../../components/reports/total-turbine-report/total-turbine-report.component';
import { TotalUserReportComponent } from '../../components/reports/total-user-report/total-user-report.component';
import { WeeklyProjectReportComponent } from '../../components/reports/weekly-project-report/weekly-project-report.component';
import { WeeklyTurbineReportComponent } from '../../components/reports/weekly-turbine-report/weekly-turbine-report.component';
import { WeeklyUserReportComponent } from '../../components/reports/weekly-user-report/weekly-user-report.component';
import { TurbineDto } from '../../components/turbines/turbine';
import { TurbineService } from '../../components/turbines/turbine.service';

@Component({
  selector: 'app-project-reports',
  templateUrl: './reports.component.html',
  standalone: true,
  imports: [
    MatTabsModule,
    MatListModule,
    MonthlyProjectReportComponent,
    WeeklyProjectReportComponent,
    TotalProjectReportComponent,
    MonthlyTurbineReportComponent,
    WeeklyTurbineReportComponent,
    TotalTurbineReportComponent,
    MonthlyUserReportComponent,
    WeeklyUserReportComponent,
    TotalUserReportComponent,
  ],
})
export class ReportsComponent {
  isAdmin: boolean = false;
  currentUsername: string = '';
  authService = inject(AuthService);
  cookieService = inject(CustomCookieService);

  projects: ProjectDto[] = [];
  selectedProject!: ProjectDto;
  projectService = inject(ProjectService);

  turbines: TurbineDto[] = [];
  selectedTurbine!: TurbineDto;
  turbineService = inject(TurbineService);

  users: UserDto[] = [];
  selectedUser!: UserDto;
  userService = inject(UserService);

  ngOnInit() {
    this.checkIfAdmin();
    this.getCurrentUserName();
    this.getAllProjects();
    this.getAllTurbines();
    this.getAllUsers();
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
    console.info('Current User Name: ' + this.currentUsername);
  }

  canAccess(users: UserDto[]): boolean {
    // check if user is admin
    if (this.isAdmin) {
      return true;
    }

    // check if user belongs to project
    for (let user of users) {
      if (user.name === this.currentUsername) {
        return true;
      }
    }

    return false;
  }

  checkUser(user: string) {
    // check if user is admin
    if (this.isAdmin) {
      return true;
    }

    // check if user belongs to project
    if (user === this.currentUsername) {
      return true;
    }

    return false;
  }

  getAllProjects() {
    this.projectService.getAll().subscribe({
      next: (response) => {
        this.projects = response;
      },
      error: (error) => {
        error;
      },
    });
  }

  selectProject(project: ProjectDto) {
    this.selectedProject = project;
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

  selectTurbine(turbine: TurbineDto) {
    this.selectedTurbine = turbine;
  }

  getAllUsers() {
    this.userService.getAll().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => {
        error;
      },
    });
  }

  selectUser(user: UserDto) {
    this.selectedUser = user;
  }
}
