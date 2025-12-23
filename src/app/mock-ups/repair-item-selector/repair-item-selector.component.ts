import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { WorkOrderLineAuthorizationRepairItem } from '../autho/db';
import { UtilitiesService } from '../../dependencies/utilities';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-repair-item-selector',
    imports: [FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatAutocompleteModule,
        CommonModule,
        ReactiveFormsModule,
        AsyncPipe],
    templateUrl: './repair-item-selector.component.html',
    styleUrl: './repair-item-selector.component.scss'
})
export class RepairItemSelectorComponent {
  @Input() repairItems: WorkOrderLineAuthorizationRepairItem[];
  myControl = new FormControl('');
  filteredOptions: Observable<WorkOrderLineAuthorizationRepairItem[]>;
  @Output() repairItemNameChange: EventEmitter<string> = new EventEmitter();
  @Output() repairItemSelected: EventEmitter<WorkOrderLineAuthorizationRepairItem> = new EventEmitter();
  id = UtilitiesService.newid();
  @ViewChild(MatAutocompleteTrigger, {read: MatAutocompleteTrigger}) inputAutoComplete: MatAutocompleteTrigger;

  focus() {
    if (!document.getElementById(this.id)) {
      setTimeout(() => this.focus(), 100);
      return;
    }
    document.getElementById(this.id).focus();
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): WorkOrderLineAuthorizationRepairItem[] {
    this.repairItemNameChange.emit(value);
    if (!this.repairItems) {
      return [];
    }
    const filterValue = value.toLowerCase();

    return this.repairItems.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  ngOnChanges(changes: SimpleChanges): void { }

  optionSelected(value) {
    const id = value.option.id;

    this.repairItemSelected.emit(this.repairItems.find(i => i.id === id));
  }

  openPanel() {
    this.inputAutoComplete.openPanel();
  }
}
