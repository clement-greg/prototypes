
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InspectionFinding } from '../cpoh-homeowner-portal/cpoh-homeowner-portal';
import { CpohQuoteDetail } from '../cpoh-quote-detail/cpoh-quote-detail';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cpoh-view-status',
  imports: [
    CpohQuoteDetail,
    MatIconModule
],
  templateUrl: './cpoh-view-status.html',
  styleUrl: './cpoh-view-status.scss',
})
export class CpohViewStatus {

  @Input() finding: InspectionFinding;
  
  @Output() closePanelNeeded: EventEmitter<void> = new EventEmitter<void>();
  statuses: Status[] = [
    {name: 'Offered', icon: 'markunread_mailbox'},
    {name: 'Accepted', icon: 'swipe_right'},
    {name: 'Scheduled', icon: 'calendar_month'},
    {name: 'In Progress', icon: 'play_arrow'},
    {name: 'Completed', icon: 'done'},
  ]

  get quote() {
    return this.finding?.job?.quote;
  }

  getStepNumber(statusName: string): number {
    return this.statuses.findIndex(s => s.name === statusName) + 1;
  }

  isComplete(statusName: string): boolean {
    if(statusName === 'Completed'){
      return true;
    }
    const currentIndex = this.statuses.findIndex(s => s.name === this.finding?.job.currentStatus);
    const statusIndex = this.statuses.findIndex(s => s.name === statusName);
    return statusIndex < currentIndex;
  }

  isCurrent(statusName: string): boolean {
    return this.finding?.job.currentStatus === statusName && statusName !== 'Completed';
  }

  isUpcoming(statusName: string): boolean {
    const currentIndex = this.statuses.findIndex(s => s.name === this.finding?.job.currentStatus);
    const statusIndex = this.statuses.findIndex(s => s.name === statusName);
    return statusIndex > currentIndex;
  }

}

class Status {
  name: string;
  icon: string;
}
