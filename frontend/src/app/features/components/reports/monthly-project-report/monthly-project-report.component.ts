import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { ActivityService } from '../../activities/activity.service';
import { MonthlyProjectReportDto } from '../reports';

@Component({
  selector: 'app-monthly-project-report',
  templateUrl: './monthly-project-report.component.html',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatTableModule, MatPaginatorModule],
})
export class MonthlyProjectReportComponent implements OnChanges {
  @Input() projectId!: string;

  public reports: MonthlyProjectReportDto[] = [];
  public tableColumns: string[] = ['month', 'type', 'minutes'];
  private activityService = inject(ActivityService);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['projectId'] && changes['projectId'].currentValue) {
      this.getReport(changes['projectId'].currentValue);
    }
  }

  private getReport(projectId: string) {
    this.activityService
      .getMonthlyProjectReports(projectId)
      .subscribe((response) => {
        this.reports = response;
        console.log(response);
      });
  }
}
