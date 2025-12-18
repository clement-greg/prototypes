import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { routes, RoutesWithMeta } from '../app.routes';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-menu',
    imports: [RouterModule, MatButtonModule, CommonModule],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss'
})
export class MenuComponent {
    allRoutes = routes;
    groupedRoutes = GroupedRoutes.fromRoutes(this.allRoutes);

    constructor() {

        console.log(this.groupedRoutes);

    }


}

export class GroupedRoutes {
    category: string;
    routes: typeof routes;

    static fromRoutes(routes: RoutesWithMeta): GroupedRoutes[] { 
        const result: GroupedRoutes[] = [];
        for(const route of routes) {
            const group = result.find(r=>r.category === route.category);
            if(group) {
                group.routes.push(route);
            } else {
                result.push({
                    category: route.category || 'Uncategorized',
                    routes: [route]
                });
            }
        }
        return result;
    }
}
