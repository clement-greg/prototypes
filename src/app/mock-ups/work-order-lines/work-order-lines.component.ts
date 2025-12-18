import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewChild } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthoComponent } from '../autho/autho.component';

@Component({
    selector: 'app-work-order-lines',
    animations: [
        trigger('simpleFadeAnimation', [
            transition(':enter', [
                style({ opacity: 0, height: '0' }),
                animate('200ms', style({ height: '*' })),
                animate('100ms', style({ opacity: 1 }))
            ]),
            transition(':leave', [
                style({ opacity: 1, height: '*' }),
                animate('100ms', style({ opacity: 0 })),
                animate('200ms', style({ height: '0' }))
            ])
        ])
    ],
    imports: [AuthoComponent, MatSlideToggleModule, MatMenuModule, MatSnackBarModule, CommonModule, MatProgressBarModule, FormsModule, MatButtonModule, MatTabsModule, MatIconModule],
    templateUrl: './work-order-lines.component.html',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    styleUrl: './work-order-lines.component.scss'
})
export class WorkOrderLinesComponent {
  hasIncompatibilityCoverage: boolean;
  selectedLine: WorkOrderLine;
  selectedIndex = 0;
  sideBarOpen = false;

  constructor(private snackBar: MatSnackBar) {

  }

  @ViewChild('authoItems') authoItems: AuthoComponent;

  lines: WorkOrderLine[] = [
    { name: 'Dishwasher', url: 'https://dev-api.upkeeplabs.com/api/WorkOrderItem/e5628f87-f9c2-48fb-b728-12c82f9d9830/Photo', authorizations: [] },
    { name: 'Oven', url: 'https://dev-api.upkeeplabs.com/api/WorkOrderItem/e5628f87-f9c2-48fb-b728-12c82f9d9830/Photo', authorizations: [] },
  ];

  selectLine(line: WorkOrderLine) {
    this.selectedLine = line;
    this.selectedIndex = 0;
  }

  get progress() {
    return ((3 - (3 - this.selectedIndex)) / 3) * 100;
  }

  saveAuthorization() {
    const autho = new Authorization();
    autho.authorizedAmount = this.authoItems.approvedTotal;
    autho.outOfPocketAmount = this.authoItems.oop;
    autho.partsCost = this.authoItems.partsCost;
    autho.description = 'Replace Condensor';

    this.selectedIndex = 0;

    setTimeout(() => this.selectedLine.authorizations.push(autho), 500);

  }

  deleteAuthorization(authorization: Authorization) {
    const index = this.selectedLine.authorizations.indexOf(authorization);
    this.selectedLine.authorizations.splice(index, 1);
    console.log(index);
    const ref = this.snackBar.open('Item Deleted', 'Undo', { duration: 10000 }).onAction().subscribe(value => {
      this.selectedLine.authorizations.splice(index, 0, authorization);
    });
  }
}

class WorkOrderLine {
  name: string;
  url: string;
  authorizations?: Authorization[];
}

class Authorization {
  description: string;
  authorizedAmount: number;
  outOfPocketAmount: number;
  partsCost: number;
}
