import { Component, Input } from '@angular/core';
import { Quote } from '../cpoh-homeowner-portal/cpoh-homeowner-portal';
import { CommonModule } from '@angular/common';
import { DisplayTotalComponent } from '../../../../dependencies/display-total/display-total.component';

@Component({
  selector: 'app-cpoh-quote-detail',
  imports: [
    CommonModule,
    DisplayTotalComponent,
  ],
  templateUrl: './cpoh-quote-detail.html',
  styleUrls: ['./cpoh-quote-detail.scss', '../style.scss']
})
export class CpohQuoteDetail {

  @Input() quote: Quote;

  get total() {
    return this.quote?.items?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
  }

}
