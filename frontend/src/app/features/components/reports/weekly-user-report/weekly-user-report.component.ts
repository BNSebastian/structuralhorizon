import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { ActivityService } from '../../activities/activity.service';
import { WeeklyUserReportDto } from '../reports';

@Component({
  selector: 'app-weekly-user-report',
  templateUrl: './weekly-user-report.component.html',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatTableModule, MatPaginatorModule],
})
export class WeeklyUserReportComponent {
  @Input() userId!: string;

  public reports: WeeklyUserReportDto[] = [];
  public tableColumns: string[] = ['week', 'type', 'minutes'];
  private activityService = inject(ActivityService);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userId'] && changes['userId'].currentValue) {
      this.getReport(changes['userId'].currentValue);
    }
  }

  private getReport(projectId: string) {
    this.activityService
      .getWeeklyUserReports(projectId)
      .subscribe((response) => {
        this.reports = response;
        console.log(response);
      });
  }

  printReport() {
    const printContent = document.getElementById('print-template')!.innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
  }
}
