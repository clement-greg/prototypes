import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BottomAppMenuComponent } from '../bottom-app-menu/bottom-app-menu.component';
import { routes, RoutesWithMeta } from '../../app.routes';
import { MatButtonModule } from '@angular/material/button';
import { BottomAppAndPanelsComponent, MyTabDirective } from '../bottom-app-and-panels/bottom-app-and-panels.component';

@Component({
  selector: 'app-bottom-app-menu-demo',
  imports: [
    CommonModule,
    BottomAppMenuComponent,
    MatButtonModule,
    BottomAppAndPanelsComponent,
    MyTabDirective,
  ],
  templateUrl: './bottom-app-menu-demo.component.html',
  styleUrl: './bottom-app-menu-demo.component.scss',
})
export class BottomAppMenuDemoComponent {

  selectedIndex = 1;

  indexes = [0, 1, 2, 3, 4];

  showLastTab = false;

  primaryRoutes: RoutesWithMeta = [
    {
      title: 'Home',
      icon: 'home',
    },
    {
      title: 'Search',
      icon: 'search',
    },
    {
      title: 'Notifications',
      icon: 'notifications',
    },
    {
      title: 'Settings',
      icon: 'settings',
    },
    {
      title: 'Profile',
      icon: 'person',
    }
  ];
  secondaryRoutes: RoutesWithMeta = [
    {
      title: 'Help',
      icon: 'help',
    }
  ];
}
