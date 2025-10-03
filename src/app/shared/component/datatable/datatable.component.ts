import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface Column {
  field: string;
  label: string;
}

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datatable.component.html'
})
export class DatatableComponent {
  @Input() columns: Column[] = [];
  @Input() data: any[] = [];

  // Optional pagination from parent
  @Input() currentPage = 1;
  @Input() pageSize = 5;
  @Input() totalPages = 1;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<number>();

  get paginatedData() {
    if (!this.data) return [];
    const start = (this.currentPage - 1) * this.pageSize;
    return this.data.slice(start, start + this.pageSize);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
  }
}
