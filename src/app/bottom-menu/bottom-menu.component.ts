import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UtilitiesService } from '../utilities';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-bottom-menu',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTabsModule],
  templateUrl: './bottom-menu.component.html',
  styleUrl: './bottom-menu.component.scss'
})
export class BottomMenuComponent implements AfterViewInit {


  selectedIndex = 0;
  isMoving = false;
  menuItems: MenuItem[] = [
    { cssClass: 'contact_phone', id: UtilitiesService.newid() },
    { cssClass: 'build', id: UtilitiesService.newid() },
    { cssClass: 'home', id: UtilitiesService.newid() },
    { cssClass: 'paid', id: UtilitiesService.newid() },
    { cssClass: 'settings', id: UtilitiesService.newid() }
  ];

  constructor() {

  }
  ngAfterViewInit(): void {
    setTimeout(() => this.selectMenuItem(this.menuItems[2]));
  }

  selectedMenuItem: MenuItem;

  left = 20;
  showDotIcon = true;

  get maskerLeft() {
    return this.left + 'px';
  }

  get maskPosition() {
    return `${(this.left - 2000)}px 0px`;
  }

  get dotLeft() {
    return (this.left + 16) + 'px';
  }

  advance() {
    this.left += 100;
  }

  resizeTimeout;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(()=> this.moveDot(), 50);
  }

  selectMenuItem(menuItem: MenuItem) {
    if (menuItem === this.selectedMenuItem) {
      return;
    }
    this.selectedMenuItem = menuItem;
    this.selectedIndex = this.menuItems.indexOf(this.selectedMenuItem);
    this.moveDot();
  }

  moveDot() {
    //this.isMoving = true;
    this.showDotIcon = false;
    setTimeout(() => this.showDotIcon = true);
    const target = document.getElementById(this.selectedMenuItem.id);
    console.log(target.offsetLeft);

    this.left = (target.offsetLeft - 7);
    setTimeout(() => {
      this.isMoving = true;
      setTimeout(() => {
        this.isMoving = false;
      }, 1000);
    }, 500);
  }
}


class MenuItem {
  cssClass: string;
  id: string;


}