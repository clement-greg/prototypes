
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InspectionFinding } from '../cpoh-homeowner-portal/cpoh-homeowner-portal';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LottiePlayerComponent } from '../../../../dependencies/lottie-player/lottie-player.component';
import { CpohQuoteDetail } from '../cpoh-quote-detail/cpoh-quote-detail';
import { CommonModule } from '@angular/common';
import { DialogsService } from '../../../../dependencies/dialog-service/dialog.service';

@Component({
  selector: 'app-cpoh-request-quote',
  imports: [
    LottiePlayerComponent,
    MatIconModule,
    MatButtonModule,
    CpohQuoteDetail,
    CommonModule,
  ],
  templateUrl: './cpoh-request-quote.html',
  styleUrls: ['./cpoh-request-quote.scss', '../style.scss']
})
export class CpohRequestQuote {

  @Input() finding: InspectionFinding;
  @Output() closePanelNeeded: EventEmitter<void> = new EventEmitter<void>();
  quote: any;
  operation: 'Requesting' | 'Requested' = 'Requesting';

  constructor(private dialogService: DialogsService) {
    setTimeout(() => {
      console.log(this.finding);
    }, 2000)
  }


  requestQuote() {
    this.dialogService.confirm('Confirm Quote Request', 'Are you sure you want to request a quote for this repair?').subscribe(confirmed => {
      if (confirmed) {
        this.finding.status = 'Waiting On Quote';
        this.operation = 'Requested';
        this.quote = {
          contractor: {
            name: 'Best Windows Co.',
            phoneNumber: '555-123-4567',
            id: '459c4447-1a0a-44e1-b042-7e3395a11dde',
          },
          status: 'Pending',
        };
      }
    });

  }

  declineRepair() {
    this.finding.status = 'Declined Repair';
    this.closePanel();
  }

  closePanel() {
    this.closePanelNeeded.emit();
  }

}
