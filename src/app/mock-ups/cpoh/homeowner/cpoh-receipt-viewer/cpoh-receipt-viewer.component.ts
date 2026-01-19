import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { InspectionFinding } from '../cpoh-homeowner-portal/cpoh-homeowner-portal';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cpoh-receipt-viewer',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './cpoh-receipt-viewer.component.html',
  styleUrl: './cpoh-receipt-viewer.component.scss',
})
export class CpohReceiptViewerComponent {


  readonly data = inject<{ inspectionFinding: InspectionFinding, receipt: any }>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<CpohReceiptViewerComponent>);
  receiptIndex: number = 0;

  sanitizedPdfSrc: SafeResourceUrl | null = null;
  imageUrl: string | null = null;

  constructor(private sanitizer: DomSanitizer) {

    if (this.defaultReceipt) {
      this.receiptIndex = this.inspectionFinding.receipts?.indexOf(this.defaultReceipt) ?? 0;
    }
    this.setUrls();
  }

  close() {
    this.dialogRef.close();
  }

  get inspectionFinding(): InspectionFinding {
    return this.data.inspectionFinding;
  }

  get defaultReceipt() {
    return this.data.receipt;
  }

  next() {
    if (this.receiptIndex < (this.inspectionFinding.receipts?.length ?? 0) - 1) {
      this.receiptIndex++;
    } else {
      this.receiptIndex = 0;
    }
    this.setUrls();
  }

  previous() {
    if (this.receiptIndex > 0) {
      this.receiptIndex--;
    } else {
      this.receiptIndex = (this.inspectionFinding.receipts?.length ?? 1) - 1;
    }
    this.setUrls();
  }

  setUrls() {
    delete this.imageUrl;
    delete this.sanitizedPdfSrc;

    setTimeout(() => {
      const receipt = this.inspectionFinding.receipts?.[this.receiptIndex];
      if (receipt.url.toLowerCase().endsWith('.pdf')) {
        this.sanitizedPdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(receipt.url);
      } else {
        this.imageUrl = receipt.url;
      }
    });
  }

  // get imageUrl() {
  //   if (this.sanitizedPdfSrc) {
  //     return null;
  //   }

  //   return this.inspectionFinding.receipts?.[this.receiptIndex]?.url;
  // }
}
