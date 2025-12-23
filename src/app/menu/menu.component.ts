import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { routes, RoutesWithMeta } from '../app.routes';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-menu',
    imports: [
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        CommonModule
    ],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss'
})
export class MenuComponent {
    allRoutes = routes;
    groupedRoutes = GroupedRoutes.fromRoutes(this.allRoutes.filter(i=>i.path !== ''));

    constructor() {
        for (const group of this.groupedRoutes) {
            if (group.routes.length === 0 && group.subcategories.length > 0) {
                group.routes = group.subcategories.flatMap(subcat => subcat.routes);
            }
        }
    }
}

export class GroupedRoutes {
    category: string;
    routes: typeof routes;
    subcategories?: SubcategoryGroup[];

    static fromRoutes(routes: RoutesWithMeta): GroupedRoutes[] {
        const result: GroupedRoutes[] = [];
        for (const route of routes) {
            const group = result.find(r => r.category === route.category);
            if (group) {
                group.routes.push(route);
            } else {
                result.push({
                    category: route.category || 'Uncategorized',
                    routes: [route]
                });
            }
        }

        // Group routes by subcategory within each category
        for (const group of result) {
            const subcategoryMap = new Map<string, typeof routes>();
            const routesWithoutSubcategory: typeof routes = [];

            for (const route of group.routes) {
                if (route.subcategory) {
                    const existing = subcategoryMap.get(route.subcategory);
                    if (existing) {
                        existing.push(route);
                    } else {
                        subcategoryMap.set(route.subcategory, [route]);
                    }
                } else {
                    routesWithoutSubcategory.push(route);
                }
            }

            if (subcategoryMap.size > 0) {
                group.subcategories = Array.from(subcategoryMap.entries()).map(([name, routes]) => ({
                    name,
                    routes
                }));
                group.routes = routesWithoutSubcategory;
            }
        }

        return result;
    }
}

export interface SubcategoryGroup {
    name: string;
    routes: typeof routes;
}
