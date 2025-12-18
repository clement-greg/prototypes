
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InspectionFinding } from '../cpoh-homeowner-portal/cpoh-homeowner-portal';
import { LottiePlayerComponent } from '../../../website-parts/lottie-player/lottie-player.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cpoh-request-quote',
  imports: [
    LottiePlayerComponent,
    MatIconModule,
    MatButtonModule
],
  templateUrl: './cpoh-request-quote.html',
  styleUrl: './cpoh-request-quote.scss',
})
export class CpohRequestQuote {

  @Input() finding: InspectionFinding;
  @Output() closePanelNeeded: EventEmitter<void> = new EventEmitter<void>();
  operation: 'Requesting' | 'Requested' = 'Requesting';


  requestQuote() {
    this.finding.status = 'Waiting On Quote';
    this.operation = 'Requested';
    setTimeout(() => this.closePanel(), 8000);
  }

  closePanel() {
    this.closePanelNeeded.emit();
  }

}
