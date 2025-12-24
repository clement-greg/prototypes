import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { UtilitiesService } from '../../dependencies/utilities';
import { RoutesWithMeta, RouteWithMeta } from '../../app.routes';
import { LottiePlayerComponent } from '../../dependencies/lottie-player/lottie-player.component';

@Component({
    standalone: true,
    selector: 'app-bottom-app-menu',
    imports: [CommonModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        LottiePlayerComponent],
    templateUrl: './bottom-app-menu.component.html',
    styleUrl: './bottom-app-menu.component.scss'
})
export class BottomAppMenuComponent implements OnChanges {

    left = 20;
    showDotIcon = true;
    selectedMenuItem: RouteWithMeta;
    @Input() selectedIndex = 0;
    @Output() selectedIndexChange: EventEmitter<number> = new EventEmitter();
    @Output() menuItemSelected: EventEmitter<RouteWithMeta> = new EventEmitter();
    @Input() primaryRoutes: RoutesWithMeta;
    @Input() secondaryRoutes: RoutesWithMeta;
    @Input() initialIndex = -1;
    
    notificationsOpen = false;
    lastWidth = 0;
    searchQuery: string;
    searchOpen = false;
    searchInputId = UtilitiesService.newid();
    hideSideOptions = false;
    notPrimaryOrSecondaryMenu: boolean;

    constructor() {  }

    get isBaseRoute() {
        return true;
    }

    getMask() {
        return `url(${this.selectedMenuItem.icon})`;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['primaryRoutes']) {
            for (const route of this.primaryRoutes) {
                route.id = UtilitiesService.newid();
            }

            const index = this.initialIndex > -1 ? this.initialIndex : Math.floor(this.primaryRoutes.length / 2);
            const menuItem = this.primaryRoutes[index];
            setTimeout(() => this.selectMenuItem(menuItem));

        }
        if(changes['selectedIndex'] && this.primaryRoutes) {
            this.selectedMenuItem = this.primaryRoutes[this.selectedIndex];
            this.moveDot();
        }
    }

    get dotLeft() {
        return (this.left + 16) + 'px';
    }
    get maskPosition() {
        return `${(this.left - 2000)}px`;
    }

    secondaryRouteClicked(route: RouteWithMeta) {
        if(route.clickAction) {
            route.clickAction();
        }
    }

    resizeTimeout;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            if (this.lastWidth === window.innerWidth) {
                return;
            }
            this.lastWidth = window.innerWidth;
            this.moveDot();
        }, 50);
    }

    moveDot() {
        if(!this.selectedMenuItem) {
            return;
        }
        this.showDotIcon = false;
        setTimeout(() => this.showDotIcon = true);
        this.moveDotToButtonId(this.selectedMenuItem.id);
    }

    moveMask = false;
    moveDotToButtonId(id: string) {
        const target = document.getElementById(id);
        if (!target) {
            return;
        }
        this.left = (target.offsetLeft - 7);
        this.moveMask = false;
        setTimeout(() => {
            this.moveMask = true;
            setTimeout(() => {
                this.moveMask = false;
            }, 500);
        });
    }

    async selectMenuItem(menuItem: RouteWithMeta) {
        this.selectedMenuItem = menuItem;
        this.selectedIndex = this.primaryRoutes.indexOf(this.selectedMenuItem);
        this.selectedIndexChange.emit(this.selectedIndex);
        this.moveDot();
        this.menuItemSelected.emit(menuItem);
    }
}
