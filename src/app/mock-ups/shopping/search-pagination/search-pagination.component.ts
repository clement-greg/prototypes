import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-search-pagination',
    imports: [CommonModule, MatButtonModule],
    templateUrl: './search-pagination.component.html',
    styleUrl: './search-pagination.component.scss'
})
export class SearchPaginationComponent {
  @Input() currentPage: number;
  @Input() allPages: number[];
  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  setPage(page: number) {
    this.pageChange.emit(page);
  } 
}
