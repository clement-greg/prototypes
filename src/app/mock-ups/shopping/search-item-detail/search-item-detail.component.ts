import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchLoadingComponent } from '../search-loading/search-loading.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { StarRatingViewerComponent } from '../../../widgets/star-rating-viewer/star-rating-viewer.component';
import { SerpapiService } from '../serpapi.service';
import { ShoppingCart } from '../shopping-cart.model';


@Component({
    selector: 'app-search-item-detail',
    imports: [CommonModule, MatCardModule, StarRatingViewerComponent, MatButtonModule, MatIconModule, SearchLoadingComponent, MatExpansionModule],
    templateUrl: './search-item-detail.component.html',
    styleUrl: './search-item-detail.component.scss'
})
export class SearchItemDetailComponent implements OnChanges, OnDestroy {
  @Input() itemId: string;
  productResults: any;
  selectedImage: string;
  selectedImageGroup: any;
  loading = false;
  @Output() addedToCart: EventEmitter<any> = new EventEmitter();
  reviews: any;
  static favorites = [];
  cart = ShoppingCart.getCart();

  constructor(private serpapi: SerpapiService) {

    this.loading = true;
    document.body.style.overflow = 'hidden';
  }
  ngOnDestroy(): void {
    document.body.style.overflow = 'unset';
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemId'].currentValue) {
      this.serpapi.get(`https://serpapi.com/search.json?store_id=4416&delivery_zip=84653&engine=home_depot_product&product_id=${this.itemId}`).then(results => {

        this.productResults = results.data[0].product_results;

        this.selectImageGroup(this.productResults.images[0]);
        this.loading = false;
      });

      this.serpapi.get(`https://serpapi.com/search.json?engine=home_depot_product_reviews&product_id=${this.itemId}`).then(results => {
        this.reviews = results.data[0];
      });
    }
  }

  get earliestDelivery() {
    if(this.productResults?.fulfillment) {
      const delivery = this.productResults.fulfillment.options.find(i=>i.type === 'Delivery');
      if(delivery) {
        return delivery.delivery_date;
      }
      const shipToHome = this.productResults.fulfillment.options.find(i=>i.type === 'Ship to Home');
      if(shipToHome && shipToHome.arrival_time && shipToHome.arrival_time[0]) {
        return shipToHome.arrival_time[0];
      }
    }
    return '';
  }

  addToFavorites() {
    if(!SearchItemDetailComponent.favorites.includes(this.itemId)) {
      SearchItemDetailComponent.favorites.push(this.itemId);
    } else {
      SearchItemDetailComponent.favorites = SearchItemDetailComponent.favorites.filter(fav => fav !== this.itemId);
    }
  }

  get isFavorite() {
    return SearchItemDetailComponent.favorites.includes(this.itemId);
  }

  addToCart() {
    ShoppingCart.getCart().cartItems.push({
      name: this.productResults.title,
      amount: this.productResults.price,
      item: this.productResults,
      quantity: 1,
    });
    this.addedToCart.emit();
  }

  get net() {
    return this.productResults.price - this.cart.cashOutAmount;
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
