
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-star-rating-viewer',
    imports: [],
    templateUrl: './star-rating-viewer.component.html',
    styleUrl: './star-rating-viewer.component.scss'
})
export class StarRatingViewerComponent {
  @Input() stars: number;
  
}
