import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

import { Client } from '../../../../../environments/client';
import { TypeDto } from '../type';
import { TypeUpdateComponent } from '../type-update/type-update.component';
import { TypeService } from '../type.service';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  standalone: true,
  imports: [MatIconModule, MatTableModule, MatPaginatorModule],
})
export class TypeListComponent {
  public tableData: TypeDto[] = [];
  public tableColumns: string[] = ['name', 'update', 'delete'];

  public paginatorCount: number = 0;
  public paginatorPageIndex: number = 0;
  public paginatorPageSize: number = 5;
  public paginatorPageSizeOptions: number[] = [5, 10, 25, 50];

  private service = inject(TypeService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
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

  edit(id: string) {
    const dialogRef = this.dialog.open(TypeUpdateComponent, {
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
