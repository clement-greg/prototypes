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
    @Input() rightPanelWidth: number = 400;
    @Input() rightPanelTop: number = 60;
    @Input() rightCloseButtonTop: number = 60;

    @Input() showLeftPanel: boolean = false;
    @Output() showLeftPanelChange: EventEmitter<boolean> = new EventEmitter<boolean>()
    @Input() leftPanelWidth: number = 400;
    @Input() leftPanelTop: number = 60;
    @Input() leftCloseButtonTop: number = 60;

    @Input() showBottomPanel = false;
    @Output() showBottomPanelChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() bottomPanelHeight: number = 300;
    @Input() bottomPanelWidth: number = 800;

    isScrolled = false;

    closeRightPanel(): void {
        if (this.showRightPanel) {
            this.showRightPanel = false;
            this.showRightPanelChange.emit(this.showRightPanel);
        }
    }

    closeLeftPanel(): void {
        if (this.showLeftPanel) {
            this.showLeftPanel = false;
            this.showLeftPanelChange.emit(this.showLeftPanel);
        }
    }

    closeBottomPanel() {
        if (this.showBottomPanel) {
            this.showBottomPanel = false;
            this.showBottomPanelChange.emit(this.showBottomPanel);
        }
    }

    get rightPanelHeight() {
        return `calc(100vh - ${this.rightPanelTop}px)`;
    }

    trackScroll(event: any) {
        const scrollTop = event.target.scrollTop;
        this.isScrolled = scrollTop > 0;
    }

    get leftPanelHeight() {
        return `calc(100vh - ${this.leftPanelTop}px)`;
    }



}
