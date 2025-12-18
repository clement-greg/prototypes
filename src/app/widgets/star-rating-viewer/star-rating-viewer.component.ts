import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-star-rating-viewer',
    imports: [CommonModule],
    templateUrl: './star-rating-viewer.component.html',
    styleUrl: './star-rating-viewer.component.scss'
})
export class StarRatingViewerComponent {
  @Input() stars: number;
  
}
