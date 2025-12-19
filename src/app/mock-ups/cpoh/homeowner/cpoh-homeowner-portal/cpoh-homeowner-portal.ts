
import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { CpohInspectionFindings } from '../cpoh-inspection-findings/cpoh-inspection-findings';
import { CpohRequestQuote } from '../cpoh-request-quote/cpoh-request-quote';
import { CpohViewQuote } from '../cpoh-view-quote/cpoh-view-quote';
import { CpohViewStatus } from '../cpoh-view-status/cpoh-view-status';
import { CpohViewReopen } from '../cpoh-view-reopen/cpoh-view-reopen';
import { SlideOutPanelContainer } from '../../../../widgets/website-parts/slide-out-panel-container/slide-out-panel-container';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cpoh-homeowner-portal',
  imports: [
    SlideOutPanelContainer,
    MatButtonModule,
    CpohInspectionFindings,
    CpohRequestQuote,
    CpohViewQuote,
    CpohViewStatus,
    CpohViewReopen,
    RouterModule,
],
  templateUrl: './cpoh-homeowner-portal.html',
  styleUrls: ['./cpoh-homeowner-portal.scss', '../style.scss'],
})
export class CpohHomeownerPortal {

  showRightPanel = false;
  selectedFinding?: InspectionFinding;
  selectedStatus?: 'Pending' | 'Waiting On Quote' | 'Quoted' | 'Work In Progress' | 'Completed' | 'Rejected';

  findings: InspectionFinding[] = [
    {
      description: 'HVAC Bad Temp Split',
      status: 'Pending',

    },
    {
      description: 'Broken Window',
      status: 'Quoted',
      quotes: [
        {
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
      job: {
        currentStatus: 'Completed',
        quote: {
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



}

export class InspectionFinding {
  description: string;
  status: 'Pending' | 'Waiting On Quote' | 'Quoted' | 'Work In Progress' | 'Completed' | 'Rejected' = 'Pending';
  quotes?: Quote[];
  job?: Job;

}

export class Quote {

  contractor: Entity;
  items: QuoteItem[];
  contractorNotes: string;

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
