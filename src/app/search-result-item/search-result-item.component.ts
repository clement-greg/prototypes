import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StarRatingViewerComponent } from '../star-rating-viewer/star-rating-viewer.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-search-result-item',
  standalone: true,
  imports: [CommonModule, StarRatingViewerComponent, MatButtonModule],
  templateUrl: './search-result-item.component.html',
  styleUrl: './search-result-item.component.scss'
})
export class SearchResultItemComponent {

  @Input() item: any;
  @Output() itemSelected: EventEmitter<string> = new EventEmitter();

  showVariant(variant) {
    const link = variant.link;
    // get everything after the last slash
    const variantId = link.substring(link.lastIndexOf('/') + 1);
    this.itemSelected.emit(variantId);
  }

  view() {
    this.itemSelected.emit(this.item.product_id);
  }
}
