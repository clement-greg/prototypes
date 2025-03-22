import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss'
})
export class SearchFilterComponent {
  @Input() filter: any;
  @Output() filterChange: EventEmitter<any> = new EventEmitter();

  raiseChange() {
    setTimeout(()=> {
      this.filterChange.emit(this.filter);
    }, 500);
  }
}
