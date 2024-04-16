import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { ActivityService } from '../../activities/activity.service';
import { TotalTurbineReportDto } from '../reports';

@Component({
  selector: 'app-total-turbine-report',
  templateUrl: './total-turbine-report.component.html',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatTableModule, MatPaginatorModule],
})
export class TotalTurbineReportComponent {
  @Input() turbineId!: string;

  public reports: TotalTurbineReportDto[] = [];
  public tableColumns: string[] = ['type', 'minutes'];
  private activityService = inject(ActivityService);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['turbineId'] && changes['turbineId'].currentValue) {
      this.getReport(changes['turbineId'].currentValue);
    }
  }

  private getReport(projectId: string) {
    this.activityService
      .getTotalTurbineReports(projectId)
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
