import { Component, Input } from '@angular/core';
import { InspectionFinding } from '../cpoh-homeowner-portal/cpoh-homeowner-portal';
import { CommonModule } from '@angular/common';

import { CpohReceiptViewerComponent } from '../cpoh-receipt-viewer/cpoh-receipt-viewer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { LottiePlayerComponent } from '../../../../dependencies/lottie-player/lottie-player.component';

@Component({
  selector: 'app-cpoh-receipt-list',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    LottiePlayerComponent,
  ],
  templateUrl: './cpoh-receipt-list.component.html',
  styleUrl: './cpoh-receipt-list.component.scss',
})
export class CpohReceiptListComponent {

  @Input() inspectionFinding: InspectionFinding;
  constructor(private dialog: MatDialog) {

  }

  viewReceipts(receipt): void {
    const isMobile = window.innerWidth < 768;
    this.dialog.open(CpohReceiptViewerComponent, {
      data: { inspectionFinding: this.inspectionFinding, receipt: receipt },
      width: isMobile ? '100vw' : '90vw',
      height: isMobile ? '100vh' : '80vh',
      maxWidth: isMobile ? '100vw' : '1200px',
      maxHeight: isMobile ? '100vh' : '90vh',
      panelClass: isMobile ? 'mobile-fullscreen-dialog' : ''
    });
  }

  isPdf(receipt: any): boolean {
    return receipt.fileName.toLowerCase().endsWith('.pdf');
  }


  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const receipt = {
          url: reader.result as string,
          fileName: file.name,
        };
        if (!this.inspectionFinding.receipts) {
          this.inspectionFinding.receipts = [];
        }
        this.inspectionFinding.receipts.push(receipt);
      };
      reader.readAsDataURL(file);
    }
  }
}
