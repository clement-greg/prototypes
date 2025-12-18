import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StarRatingViewerComponent } from '../../../widgets/star-rating-viewer/star-rating-viewer.component';

@Component({
    selector: 'app-search-result-item',
    imports: [CommonModule, StarRatingViewerComponent, MatButtonModule, MatIconModule],
    templateUrl: './search-result-item.component.html',
    styleUrl: './search-result-item.component.scss'
})
export class SearchResultItemComponent {

  @Input() item: any;
  @Output() itemSelected: EventEmitter<string> = new EventEmitter();
  selectedVariant;

  showVariant(variant, evt: MouseEvent) {
    evt.stopPropagation();
    const link = variant.link;
    // get everything after the last slash
    const variantId = link.substring(link.lastIndexOf('/') + 1);
    this.itemSelected.emit(variantId);
  }

  view() {
    this.itemSelected.emit(this.item.product_id);
  }
}
