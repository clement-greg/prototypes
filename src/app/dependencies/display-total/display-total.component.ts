import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-display-total',
  standalone: true,
  imports: [CommonModule,
    MatIconModule,],
  templateUrl: './display-total.component.html',
  styleUrl: './display-total.component.scss'
})
export class DisplayTotalComponent {
  @Input() total: number;
  @Input() label = 'Total';
  @Input() symbol = '$';
  @Input() suffix = '';
  @Input() showWarning: boolean;
  @Input() hideTriangle = false;

  constructor() { }

  ngOnInit() {
  }

  get dollars(): number {
    if (this.total !== undefined) {
      return parseInt(this.total.toString(), 10);
    } else {
      return 0;
    }
  }

  get cents(): number {
    let cents = this.total % this.dollars;
    if (isNaN(cents)) {
      cents = 0;
    }

    return cents * 100;
  }
}
