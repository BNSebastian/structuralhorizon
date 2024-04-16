import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { WarningDto } from '../warning';
import { WarningService } from '../warning.service';

@Component({
  selector: 'app-warning-list',
  templateUrl: './warning-list.component.html',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, MatCardModule, MatPaginatorModule],
})
export class WarningListComponent {
  public data: WarningDto[] = [];
  private service = inject(WarningService);
  ngOnInit(): void {
    this.getPage(this.paginatorPageIndex, this.paginatorPageSize);
  }

  public paginatorCount: number = 0;
  public paginatorPageIndex: number = 0;
  public paginatorPageSize: number = 5;
  public paginatorPageSizeOptions: number[] = [5, 10, 25, 50];

  paginatorEvent(event: PageEvent) {
    this.paginatorPageIndex = event.pageIndex;
    this.paginatorPageSize = event.pageSize;
    this.getPage(this.paginatorPageIndex, this.paginatorPageSize);
  }

  getPage(pageIndex: number, pageSize: number) {
    this.service.getPage(pageIndex, pageSize).subscribe({
      next: (response) => {
        this.data = response.content;
        this.paginatorCount = response.totalElements;
      },
      error: (error) => {
        error;
      },
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
}
