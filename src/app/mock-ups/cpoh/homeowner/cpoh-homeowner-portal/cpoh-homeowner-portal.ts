
import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { CpohInspectionFindings } from '../cpoh-inspection-findings/cpoh-inspection-findings';
import { CpohRequestQuote } from '../cpoh-request-quote/cpoh-request-quote';
import { CpohViewQuote } from '../cpoh-view-quote/cpoh-view-quote';
import { CpohViewStatus } from '../cpoh-view-status/cpoh-view-status';
import { CpohViewReopen } from '../cpoh-view-reopen/cpoh-view-reopen';
import { SlideOutPanelContainer } from '../../../../widgets/website-parts/slide-out-panel-container/slide-out-panel-container';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HowItWorksComponent } from '../../how-it-works/how-it-works.component';
import { UtilitiesService } from '../../../../dependencies/utilities';
import { MatDialog } from '@angular/material/dialog';
import { CpohReceiptViewerComponent } from '../cpoh-receipt-viewer/cpoh-receipt-viewer.component';
import { CpohReceiptListComponent } from '../cpoh-receipt-list/cpoh-receipt-list.component';
import { CommonModule } from '@angular/common';
import { CpohWaitingOnQuoteComponent } from '../cpoh-waiting-on-quote/cpoh-waiting-on-quote.component';

@Component({
  selector: 'app-cpoh-homeowner-portal',
  imports: [
    SlideOutPanelContainer,
    MatButtonModule,
    CpohInspectionFindings,
    CpohRequestQuote,
    CpohViewQuote,
    MatIconModule,
    HowItWorksComponent,
    CpohViewStatus,
    CpohViewReopen,
    RouterModule,
    CpohReceiptListComponent,
    CpohReceiptViewerComponent,
    CommonModule,
    CpohWaitingOnQuoteComponent,
  ],
  templateUrl: './cpoh-homeowner-portal.html',
  styleUrls: ['./cpoh-homeowner-portal.scss', '../style.scss'],
})
export class CpohHomeownerPortal {

  showRightPanel = false;
  showBottomPanel = false;
  selectedFinding?: InspectionFinding;
  selectedStatus?: 'Pending' | 'Waiting On Quote' | 'Quoted' | 'Work In Progress' | 'Completed' | 'Rejected' | 'Declined Repair';
  receiptsPanelOpen = false;

  constructor(private dialog: MatDialog) {

  }

  findings: InspectionFinding[] = [
    {
      description: 'HVAC Bad Temp Split',
      status: 'Pending',
      extendedDescription: 'A bad temperature split is a clear sign that an HVAC system isn’t transferring heat the way it should, and that usually means something fundamental is wrong with airflow, refrigerant charge, or the duct system. When the air coming out of the vents isn’t much warmer or cooler than the return air, the system is either failing to absorb heat or struggling to move enough air across the coil. That can point to issues like dirty filters, blocked ducts, low refrigerant, failing blowers, or leaky ductwork — all of which force the system to run longer, waste energy, reduce comfort, and put extra stress on the compressor and other components. In short, a bad temperature split is an early warning that the system is working harder, costing more, and wearing out faster than it should.'

    },
    {
      description: 'Broken Window',
      status: 'Quoted',
      quotes: [
        {
          id: UtilitiesService.newid(),
          contractor: {
            name: 'Best Windows Co.',
            phoneNumber: '555-123-4567',
            id: '459c4447-1a0a-44e1-b042-7e3395a11dde'
          },
          items: [
            {
              name: 'Replace broken window',
              amount: 350
            },
            {
              name: 'Install new window frame',
              amount: 150
            }
          ],
          contractorNotes: 'We can get this done quickly for you. Let us know if you have any questions. We can also do more if you need '
        }
      ]
    },
    {
      description: 'Roof Leak',
      status: 'Work In Progress',
      job: {
        currentStatus: 'In Progress',
        quote: {
          id: UtilitiesService.newid(),
          contractor: {
            name: 'Best Windows Co.',
            phoneNumber: '555-123-4567',
            id: '459c4447-1a0a-44e1-b042-7e3395a11dde'
          },
          items: [
            {
              name: 'Replace broken window',
              amount: 350
            },
            {
              name: 'Install new window frame',
              amount: 150
            }
          ],
          contractorNotes: 'We can get this done quickly for you. Let us know if you have any questions. We can also do more if you need '
        }
      }
    },
    {
      description: 'Plumbing Issue',
      status: 'Completed',
      receipts: [
        {
          url: 'https://upkeeplabs.blob.core.windows.net/doc-public/demo-files/271444.pdf',
          fileName: 'Plumbing_Receipt.pdf'
        },
        {
          url: 'https://upkeeplabs.blob.core.windows.net/doc-public/demo-files/FileToEmail.pdf',
          fileName: 'Parts_Receipt.pdf'
        },
        {
          url: 'https://upkeeplabs.blob.core.windows.net/doc-public/demo-files/some-other-receipt.png',
          fileName: 'Work_Photo.png'
        }
      ],
      job: {
        currentStatus: 'Completed',
        quote: {
          id: UtilitiesService.newid(),
          contractor: {
            name: 'Plumbing Pros',
            phoneNumber: '555-987-6543',
            id: '123e4567-e89b-12d3-a456-426614174000'
          },
          items: [
            {
              name: 'Fix leaking pipe',
              amount: 200
            }
          ],
          contractorNotes: 'The leaking pipe has been fixed. Please reach out if you have any further issues.'
        }
      }
    },
    {
      description: 'Mold Remediation',
      status: 'Rejected',

    }
  ];

  selectFinding(finding: InspectionFinding): void {
    this.selectedFinding = finding;
    this.showRightPanel = true;
    this.selectedStatus = finding.status;
    this.receiptsPanelOpen = false;
  }

  showRightPanelChange(value: boolean) {
    if (!value) {
      this.selectedFinding = null;
    }
  }

  closeRightPanel() {
    this.showRightPanel = false;
    this.selectedFinding = undefined;
  }

  viewReceipts(finding: InspectionFinding): void {
    const isMobile = window.innerWidth < 768;
    this.dialog.open(CpohReceiptViewerComponent, {
      data: finding,
      width: isMobile ? '100vw' : '90vw',
      height: isMobile ? '100vh' : '80vh',
      maxWidth: isMobile ? '100vw' : '1200px',
      maxHeight: isMobile ? '100vh' : '90vh',
      panelClass: isMobile ? 'mobile-fullscreen-dialog' : ''
    });
  }
}

export class InspectionFinding {
  description: string;
  status: 'Pending' | 'Waiting On Quote' | 'Quoted' | 'Work In Progress' | 'Completed' | 'Rejected' | 'Declined Repair' = 'Pending';
  quotes?: Quote[];
  job?: Job;
  extendedDescription?: string;
  workOrderId?: string;
  acceptedQuoteId?: string;
  rejectedReason?: string;
  receipts?: Receipt[];
}

export class Receipt {
  url: string;
  fileName: string;
}

export class Quote {
  id: string;
  contractor: Entity;
  items: QuoteItem[];
  contractorNotes: string;
  status?: string;
}

export class QuoteItem {
  name: string;
  amount: number;
}

export class Entity {
  name: string;
  phoneNumber: string;
  id: string;
}

export class Job {

  currentStatus?: 'Offered' | 'Accepted' | 'Scheduled' | 'In Progress' | 'Completed';
  quote?: Quote;
}

export class JobStatus {
  name: string;
  icon: string;
}
