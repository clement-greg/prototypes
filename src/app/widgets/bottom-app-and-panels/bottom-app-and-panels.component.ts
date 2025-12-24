import { AfterContentInit, Component, ContentChildren, Directive, Input, QueryList, TemplateRef } from '@angular/core';
import { BottomAppMenuComponent } from '../bottom-app-menu/bottom-app-menu.component';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Directive({ selector: '[myTab]' })
export class MyTabDirective {
  constructor(public template: TemplateRef<any>) { }
  @Input() title!: string;
  @Input() icon!: string;
}


@Component({
  selector: 'app-bottom-app-and-panels',
  imports: [BottomAppMenuComponent, CommonModule],
  templateUrl: './bottom-app-and-panels.component.html',
  styleUrl: './bottom-app-and-panels.component.scss',
  animations: [
    trigger('tabAnimation', [
      transition(':increment', [
        style({ opacity: 0, transform: 'translateX(60px)' }),
        animate('250ms ease-out')
      ]),
      transition(':decrement', [
        style({ opacity: 0, transform: 'translateX(-60px)' }),
        animate('250ms ease-out')
      ])
    ])
  ]

})
export class BottomAppAndPanelsComponent implements AfterContentInit {
  @ContentChildren(MyTabDirective) tabs!: QueryList<MyTabDirective>;
  selectedIndex = 0;
  initialIndex = -1; 
  primary: { title: string; icon: string }[] = [];

  constructor() {
  }

  ngAfterContentInit(): void {
    this.primary = this.tabs.toArray().map(tab => ({ title: tab.title, icon: tab.icon }));
    this.tabs.changes.subscribe(() => {
      const currentPrimary = this.primary[this.selectedIndex];
      this.primary = this.tabs.toArray().map(tab => ({ title: tab.title, icon: tab.icon }));
      if (currentPrimary) {
        const idx = this.primary.findIndex(t => t.title === currentPrimary.title && t.icon === currentPrimary.icon);
        if (idx > -1) {
          this.initialIndex = idx;
        }
      }
      // if (currentPrimary) {
      //   setTimeout(() => {

      //     console.log(idx);
      //     if (idx > -1) {
      //       this.selectedIndex = idx;
      //     }
      //   }, 200);
      // }

    });
  }
}


