import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InspectionFinding } from '../cpoh-homeowner-portal/cpoh-homeowner-portal';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cpoh-inspection-findings',
  imports: [CommonModule, 
    MatIconModule,
    MatButtonModule],
  templateUrl: './cpoh-inspection-findings.html',
  styleUrls: ['./cpoh-inspection-findings.scss',  '../style.scss']
})
export class CpohInspectionFindings {

  @Input() findings: InspectionFinding[] = [];

  @Output() findingSelected: EventEmitter<InspectionFinding> = new EventEmitter<InspectionFinding>();
  selectFinding(finding: InspectionFinding): void { 
    this.findingSelected.emit(finding);
  }
}
