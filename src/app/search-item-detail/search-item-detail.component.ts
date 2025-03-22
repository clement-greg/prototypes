import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SerpapiService } from '../serpapi.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { StarRatingViewerComponent } from '../star-rating-viewer/star-rating-viewer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchLoadingComponent } from '../search-loading/search-loading.component';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-search-item-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, StarRatingViewerComponent, MatButtonModule, MatIconModule, SearchLoadingComponent, MatExpansionModule],
  templateUrl: './search-item-detail.component.html',
  styleUrl: './search-item-detail.component.scss'
})
export class SearchItemDetailComponent implements OnChanges {
  @Input() itemId: string;
  productResults: any;
  selectedImage: string;
  selectedImageGroup: any;
  loading = false;
  @Input() cashOutAmount = 675;
  reviews: any;

  constructor(private serpapi: SerpapiService) {

    this.loading = true;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemId'].currentValue) {
      this.serpapi.get(`https://serpapi.com/search.json?engine=home_depot_product&product_id=${this.itemId}`).then(results => {

        this.productResults = results.data[0].product_results;

        this.selectImageGroup(this.productResults.images[0]);
        this.loading = false;
      });

      this.serpapi.get(`https://serpapi.com/search.json?engine=home_depot_product_reviews&product_id=${this.itemId}`).then(results => {
        this.reviews = results.data[0];
        console.log(this.reviews);
        console.log(results)
      });
    }
  }

  get net() {
    return this.productResults.price - this.cashOutAmount;
  }

  getRatingWidth(rating) {
    const sum = this.reviews.ratings.reduce((acc, r) => acc + r.count, 0);
    const percent = rating.count / sum * 100;
    return percent + '%';
  }

  selectImageGroup(imageGroup) {
    this.selectedImage = imageGroup[imageGroup.length - 1];
    this.selectedImageGroup = imageGroup;
  }
}
