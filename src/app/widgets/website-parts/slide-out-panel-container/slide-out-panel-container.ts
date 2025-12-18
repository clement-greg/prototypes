import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { trigger, transition, style, animate } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-slide-out-panel-container',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './slide-out-panel-container.html',
  styleUrl: './slide-out-panel-container.scss',
  // animations: [
  //   trigger('expandIn', [
  //     transition(':enter', [
  //       style({ opacity: 0, transform: 'scaleX(0)' }),
  //       animate('250ms ease-out', style({ opacity: 1, transform: 'scaleX(1)' }))
  //     ]),
  //     transition(':leave', [
  //       style({ opacity: 1, transform: 'scaleX(1)' }),
  //       animate('250ms ease-in', style({ opacity: 0, transform: 'scaleX(0)' }))
  //     ])
  //   ])
  // ]
})
export class SlideOutPanelContainer {

  @Input() showRightPanel: boolean = false;
  @Output() showRightPanelChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() panelWidth: number = 400;
  @Input() panelTop: number = 60;
  isScrolled = false;

  closeRightPanel(): void {
    this.showRightPanel = false;
    this.showRightPanelChange.emit(this.showRightPanel);
  }

  get panelHeight() {
    return `calc(100vh - ${this.panelTop}px)`;
  }

  trackScroll(event: any) {
    const scrollTop = event.target.scrollTop;
    this.isScrolled = scrollTop > 0;
  }
}
