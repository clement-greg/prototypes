import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InspectionFinding } from '../cpoh-homeowner-portal/cpoh-homeowner-portal';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LottiePlayerComponent } from '../../../../dependencies/lottie-player/lottie-player.component';

@Component({
  selector: 'app-cpoh-waiting-on-quote',
  imports: [
    CommonModule,
    MatButtonModule,
    LottiePlayerComponent,
  ],
  templateUrl: './cpoh-waiting-on-quote.component.html',
  styleUrl: './cpoh-waiting-on-quote.component.scss',
})
export class CpohWaitingOnQuoteComponent {
  @Input() finding: InspectionFinding;
  @Output() closePanelNeeded: EventEmitter<void> = new EventEmitter<void>();

  cancelQuote() {
    this.finding.status = 'Declined Repair';
    this.closePanelNeeded.emit();
  }
}
