
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InspectionFinding } from '../cpoh-homeowner-portal/cpoh-homeowner-portal';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cpoh-view-reopen',
  imports: [
    MatButtonModule
],
  templateUrl: './cpoh-view-reopen.html',
  styleUrl: './cpoh-view-reopen.scss',
})
export class CpohViewReopen {

  @Input() finding: InspectionFinding;
  @Output() closePanelNeeded: EventEmitter<void> = new EventEmitter<void>();

  reopenQuote() {
    this.finding.status = 'Pending';
    this.closePanelNeeded.emit();
  }
}
