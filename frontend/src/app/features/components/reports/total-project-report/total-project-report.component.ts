import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { ActivityService } from '../../activities/activity.service';
import { TotalProjectReportDto } from '../reports';

@Component({
  selector: 'app-total-project-report',
  templateUrl: './total-project-report.component.html',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatTableModule, MatPaginatorModule],
})
export class TotalProjectReportComponent {
  @Input() projectId!: string;

  public reports: TotalProjectReportDto[] = [];
  public tableColumns: string[] = ['type', 'minutes'];
  private activityService = inject(ActivityService);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['projectId'] && changes['projectId'].currentValue) {
      this.getReport(changes['projectId'].currentValue);
    }
  }

  private getReport(projectId: string) {
    this.activityService
      .getTotalProjectReports(projectId)
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
