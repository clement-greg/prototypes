import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchResultItemComponent } from '../search-result-item/search-result-item.component';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { SearchPaginationComponent } from '../search-pagination/search-pagination.component';
import { SearchLoadingComponent } from '../search-loading/search-loading.component';
import { SearchFilterContainerComponent } from '../search-filter-container/search-filter-container.component';
import { SearchItemDetailComponent } from '../search-item-detail/search-item-detail.component';
import { CartComponent } from '../cart/cart.component';
import { SerpapiService } from '../serpapi.service';

@Component({
    selector: 'app-shopping',
    imports: [CommonModule, MatButtonModule, MatFormFieldModule, FormsModule,
        SearchPaginationComponent,
        SearchLoadingComponent,
        SearchItemDetailComponent,
        SearchFilterContainerComponent,
        CartComponent,
        SearchFilterComponent, MatInputModule, MatIconModule, MatProgressSpinnerModule, SearchResultItemComponent],
    templateUrl: './shopping.component.html',
    styleUrl: './shopping.component.scss'
})
export class ShoppingComponent {

  searchFor = 'Refrigerator';
  searching = false;
  searchResults;
  filters: any[];
  page = 1;
  allPages: number[];
  selectedItemId: string;
  showCart = false;


  constructor(private serpapi: SerpapiService) {

  }



  search(newSearch = false) {
    if (newSearch) {
      this.page = 1;
    }

    this.searching = true;
    const url = this.buildSearchUrl(newSearch);

    this.serpapi.get(url).then(results => {
      this.setResults(results, newSearch);
    });

  }

  setPage(page: number) {
    this.page = page;
    this.search();
  }

  orderComplete() {
    this.showCart = false;
    delete this.searchResults;
    delete this.filters;
  }

  buildSearchUrl(newSearch = false) {
    let url = `https://serpapi.com/search.json?store_id=4416&delivery_zip=84653&engine=home_depot&q=${this.searchFor}&country=us&page=${this.page}`;
    if (!newSearch && this.filters) {
      let filterString = '';
      for (const filter of this.filters) {
        for (const item of filter.value) {
          if (item.selected) {
            if (!filterString) {
              filterString = item.value;
            } else {

              filterString += ',' + item.value;
            }
          }
        }
      }
      if (filterString) {
        url += `&hd_filter_tokens=${filterString}`;
      }
    }
    return url;
  }

  showItemDetail(itemId: string) {
    this.selectedItemId = itemId;
  }

  addedToCart() {
    this.selectedItemId = null;
    this.showCart = true;
  }

  setResults(results, newSearch = false) {
    console.log(results);
    this.searching = false;
    this.searchResults = results.data[0].products.filter(i => i.price);
    if (newSearch) {
      this.filters = results.data[0].filters;
      const pagination = results.data[0].pagination;
      this.allPages = [pagination.current];
      for (let key in pagination.other_pages) {
        this.allPages.push(parseInt(key));
      }

      this.allPages.sort((a, b) => a - b);
    }
  }

}
