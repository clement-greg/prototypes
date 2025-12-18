
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InspectionFinding } from '../cpoh-homeowner-portal/cpoh-homeowner-portal';
import { CpohQuoteDetail } from '../cpoh-quote-detail/cpoh-quote-detail';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { LottiePlayerComponent } from '../../../../dependencies/lottie-player/lottie-player.component';

@Component({
  selector: 'app-cpoh-view-quote',
  imports: [
    MatButtonModule,
    MatIconModule,
    LottiePlayerComponent,
    MatCheckboxModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CpohQuoteDetail
],
  templateUrl: './cpoh-view-quote.html',
  styleUrls: ['./cpoh-view-quote.scss', '../style.scss']
})
export class CpohViewQuote {

  @Input() finding: InspectionFinding;
  @Output() closePanelNeeded: EventEmitter<void> = new EventEmitter<void>();
  operation: 'Viewing' | 'Accepting' | 'Rejecting' | 'Accepted' | 'Rejected' = 'Viewing';
  acceptTerms: boolean = false;
  rejectReasons: string[] = [
    'Price',
    'Found My Owner Service Pro',
    'Not Needed Anymore',
    'Timing Doesn\'t Work',
    'Other',
  ];
  selectedReason:string = '';
  comments: string = '';

  get selectedQuote() {
    return this.finding?.quotes?.[0];
  }

  closePanel() {
    this.closePanelNeeded.emit();
  }

  beginAcceptQuote() {
    console.log('Accepting quote');
    this.operation = 'Accepting';
  }

  beginRejectQuote() {
    this.operation = 'Rejecting';
  }

  back() {
    this.operation = 'Viewing';
  }

  rejectQuote() {
    this.finding.status = 'Rejected';
    this.operation = 'Rejected'
    setTimeout(() => this.closePanel(), 10000);
  }

  acceptQuote() {
    this.operation = 'Accepted';
    this.finding.status = 'Work In Progress';
    setTimeout(() => this.closePanel(), 10000);
  }
}
