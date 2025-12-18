import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterOutlet, RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { GroupedRoutes } from './menu/menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'app-root',
    imports: [
      RouterOutlet,
      RouterModule,
      MatMenuModule,
      MatButtonModule,
      MatIconModule,
      MatDividerModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'prototypes';
      allRoutes = routes;
      groupedRoutes = GroupedRoutes.fromRoutes(this.allRoutes);
}
