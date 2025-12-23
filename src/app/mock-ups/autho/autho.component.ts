import { Component, EventEmitter, Input, Output, ViewChild, viewChild } from '@angular/core';
import { CostLine, WorkOrderLineAuthorizationRepairItem } from './db';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RepairItemSelectorComponent } from '../repair-item-selector/repair-item-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatRippleModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DisplayTotalComponent } from '../../dependencies/display-total/display-total.component';
import { UtilitiesService } from '../../dependencies/utilities';

@Component({
    selector: 'app-autho',
    animations: [
        // the fade-in/fade-out animation.
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
    imports: [CommonModule,
        MatButtonModule,
        MatIconModule,
        RepairItemSelectorComponent,
        DisplayTotalComponent,
        ReactiveFormsModule,
        FormsModule,
        MatCheckboxModule,
        MatRippleModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatInputModule],
    templateUrl: './autho.component.html',
    styleUrl: './autho.component.scss'
})
export class AuthoComponent {

  items = WorkOrderLineAuthorizationRepairItem.getItems();
  costLines: CostLine[] = [];
  @Input() sideBarOpen = false;
  @Output() sideBarOpenChange: EventEmitter<boolean> = new EventEmitter();
  @Input() hasIncompatibilityCoverage = false;

  @ViewChild('repairItemSelectorComponent') repairItemSelectorComponent: RepairItemSelectorComponent;

  selectedCostLine: CostLine;

  constructor(private snackBar: MatSnackBar) {

  }


  createNew() {
    this.selectedCostLine = new CostLine();
    this.selectedCostLine.id = UtilitiesService.newid();
    this.sideBarOpen = !this.sideBarOpen;
    this.sideBarOpenChange.emit(this.sideBarOpen);
    this.selectedCostLine.companyProvidedAvailable = true;
    this.selectedCostLine.companyProvidesPart = true;
  }

  editLine(item: CostLine) {
    const copy = UtilitiesService.copyObject(item, null, () => new CostLine());
    this.selectedCostLine = copy;
    copy.defaultItem = true;
    this.sideBarOpen = true;
    this.sideBarOpenChange.emit(this.sideBarOpen);
  }

  repairItemNameChange(name: string) {
    const line: CostLine = this.selectedCostLine;
    delete line.repairItemId;
    delete line.authorizationRepairItemSelector;
    line.description = name;
  }

  getIsLineCovered(item: CostLine) {
    if (item.authorizationRepairItemSelector && !item.authorizationRepairItemSelector.salesItemCoverageAuthorizationRepairItemId) {
      return false;
    }
    if (!item.forIncompatibility && item.authorizationRepairItemSelector) {
      return item.isCovered;
    }


    return this.hasIncompatibilityCoverage;
  }

  unDefault() {
    this.selectedCostLine.defaultItem = false;
    delete this.selectedCostLine.authorizationRepairItemSelector;
    delete this.selectedCostLine.description;

    setTimeout(() => this.repairItemSelectorComponent.focus(), 400);
  }

  repairItemSelected(repairItem: WorkOrderLineAuthorizationRepairItem) {
    const line = this.selectedCostLine;
    line.repairItemId = repairItem.id;
    line.description = repairItem.name;
    line.authorizationRepairItemSelector = repairItem;
    if (repairItem.priceRangeMin) {
      line.amount = repairItem.priceRangeMin;
    }
    if (repairItem?.companyNeverProvides) {
      line.companyProvidesPart = false;
    }

    line.companyProvidedAvailable = !repairItem?.companyNeverProvides;
  }

  get canSaveItem() {
    return this.selectedCostLine && this.selectedCostLine.description;
  }

  addUpdateItem() {
    const index = this.costLines.indexOf(this.costLines.find(i => i.id === this.selectedCostLine.id));
    if (index > -1) {
      this.costLines.splice(index, 1);
      this.costLines.splice(index, 0, this.selectedCostLine);
    } else {
      this.costLines.push(this.selectedCostLine);
    }
    delete this.selectedCostLine;
    this.sideBarOpen = false;
    this.sideBarOpenChange.emit(this.sideBarOpen);
  }



  get oop() {
    let amt = this.costLines.map(i => {
      if ((i.forIncompatibility && !this.hasIncompatibilityCoverage) || !i.authorizationRepairItemSelector || !i.authorizationRepairItemSelector.salesItemCoverageAuthorizationRepairItemId) {
        return i.ext;
      }
      if (i.authorizationRepairItemSelector?.perUnitLimit && i.authorizationRepairItemSelector?.perUnitLimit < i.amount) {
        return (i.amount - i.authorizationRepairItemSelector.perUnitLimit) * i.qty;
      }
      return 0;
    })
      .reduce((a, b) => a + b, 0);

    const groupLimits = GroupedLimits.fromCostLines(this.costLines);
    for (const item of groupLimits) {
      amt += item.outOfPocket;
    }
    return amt;
  }

  get approvedTotal() {
    let amt = this.costLines.filter(i =>
      (!i.forIncompatibility || this.hasIncompatibilityCoverage) && !i.companyProvidesPart && i.authorizationRepairItemSelector && i.authorizationRepairItemSelector.salesItemCoverageAuthorizationRepairItemId)
      .map(i => {
        if (i.authorizationRepairItemSelector.perUnitLimit && i.authorizationRepairItemSelector.perUnitLimit < i.amount) {
          return i.authorizationRepairItemSelector.perUnitLimit * i.qty;
        }
        return i.ext;
      }).reduce((a, b) => a + b, 0);


    const groupLimits = GroupedLimits.fromCostLines(this.costLines.filter(i => !i.companyProvidesPart));

    for (const item of groupLimits) {
      amt -= item.outOfPocket;
    }
    return amt;
  }

  get partsCost() {
    let amt = this.costLines.filter(i =>
      (!i.forIncompatibility || this.hasIncompatibilityCoverage) && i.companyProvidesPart && i.authorizationRepairItemSelector && i.authorizationRepairItemSelector.salesItemCoverageAuthorizationRepairItemId)
      .map(i => {
        if (i.authorizationRepairItemSelector.perUnitLimit && i.authorizationRepairItemSelector.perUnitLimit < i.amount) {
          return i.authorizationRepairItemSelector.perUnitLimit * i.qty;
        }
        return i.ext;
      }).reduce((a, b) => a + b, 0);


    const groupLimits = GroupedLimits.fromCostLines(this.costLines);

    for (const item of groupLimits) {
      amt -= item.outOfPocket;
    }
    return amt;
  }

  get isRed() {
    return this.pct > 70;
  }


  get isGreen() {
    if (this.pct < 40) {
      return true;
    }

    return false;
  }

  get isYellow() {
    if (this.pct >= 40 && this.pct < 70) {
      return true;
    }
    return false;
  }

  get pct() {

    let value = this.costLines.filter(i => !i.companyProvidesPart && i.isCovered).map(i => i.amount).reduce((a, b) => a + b, 0);
    const minValue = this.costLines.filter(i => !i.companyProvidesPart && i.isCovered).map(i => i.authorizationRepairItemSelector.priceRangeMin).reduce((a, b) => a + b, 0) * .95;
    const maxValue = this.costLines.filter(i => !i.companyProvidesPart && i.isCovered).map(i => i.authorizationRepairItemSelector.priceRangeMax).reduce((a, b) => a + b, 0) * 1.1;


    if (value > maxValue) {
      value = maxValue;
    }
    if (value < minValue) {
      value = minValue;
    }

    let range = maxValue - minValue;
    value = value - minValue;

    if (range === 0) {
      return 0;
    }

    return (value / range) * 100;
  }

  get indicatorPercent() {
    return this.pct.toString() + '%';
  }


  deleteItem(item: CostLine, evt: MouseEvent) {
    evt.stopPropagation();
    const index = this.costLines.indexOf(item);

    this.costLines.splice(index, 1);
    const ref = this.snackBar.open('Item Removed', 'Undo', { duration: 10000 }).onAction().subscribe(value => {
      this.costLines.splice(index, 0, item);
    });
  }

}

class GroupedLimits {
  salesItemCoverageAuthorizationRepairItemId: string;
  limit: number;
  items: CostLine[];

  get coveredAmount() {
    const amt = this.items.map(i => i.ext).reduce((a, b) => a + b);
    if (amt > this.limit) {
      return this.limit;
    }

    return amt;
  }

  get outOfPocket() {
    const amt = this.items.map(i => i.ext).reduce((a, b) => a + b);
    if (amt > this.limit) {
      return amt - this.limit;
    }
    return 0;
  }

  static fromCostLines(costLines: CostLine[]) {
    const groups: GroupedLimits[] = [];
    for (const item of costLines.filter(i => i.authorizationRepairItemSelector?.overallLimit)) {
      let group = groups.find(i => i.salesItemCoverageAuthorizationRepairItemId === item.authorizationRepairItemSelector.salesItemCoverageAuthorizationRepairItemId);
      if (!group) {
        group = new GroupedLimits();
        group.salesItemCoverageAuthorizationRepairItemId = item.authorizationRepairItemSelector.salesItemCoverageAuthorizationRepairItemId;
        group.limit = item.authorizationRepairItemSelector.overallLimit;
        group.items = [];
        groups.push(group);
      }

      group.items.push(item);
    }

    return groups;
  }
}
