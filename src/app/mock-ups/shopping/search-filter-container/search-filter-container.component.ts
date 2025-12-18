import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
    selector: 'app-search-filter-container',
    imports: [CommonModule, SearchFilterComponent, MatExpansionModule],
    templateUrl: './search-filter-container.component.html',
    styleUrl: './search-filter-container.component.scss'
})
export class SearchFilterContainerComponent {
  @Input() filters: any[];
  @Output() filtersChange: EventEmitter<any[]> = new EventEmitter();

  raiseFilterChange() {
    this.filtersChange.emit(this.filters);
  }
}
