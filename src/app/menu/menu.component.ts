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
    subcategories?: SubcategoryGroup[];

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
        
        // Group routes by subcategory within each category
        for(const group of result) {
            const subcategoryMap = new Map<string, typeof routes>();
            const routesWithoutSubcategory: typeof routes = [];
            
            for(const route of group.routes) {
                if(route.subcategory) {
                    const existing = subcategoryMap.get(route.subcategory);
                    if(existing) {
                        existing.push(route);
                    } else {
                        subcategoryMap.set(route.subcategory, [route]);
                    }
                } else {
                    routesWithoutSubcategory.push(route);
                }
            }
            
            if(subcategoryMap.size > 0) {
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
