import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-polaroid-carousel',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './polaroid-carousel.component.html',
  styleUrl: './polaroid-carousel.component.scss'
})
export class PolaroidCarouselComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']?.currentValue) {
      this.selectedIndex = this.items.length - 1;
    }
  }

  @Input() size = 600;
  @Output() sizeChange: EventEmitter<number> = new EventEmitter<number>();
  selectedIndex = 0;
  activeIndex = -1;
  nextActiveIndex = -1;
  prevActiveIndex = -1;
  @Input() items;

  isOne(item: any) {
    return this.items.indexOf(item) === this.selectedIndex;
  }

  get outerContainerHeight() {
    return `${this.size + 150}px`;
  }

  get width() {
    return `${this.size}px`;
  }

  get paddingLeft() {
    return `450px`;
  }

  get paddingTop() {
    return `${this.size * .1}px`;
  }

  get whiteSpaceHeight() {
    return `${this.size * .17}px`;
  }

  get padding() {
    return `${this.size * .05}px`;
  }

  get height() {
    return `${this.size + 50}px`;
  }

  isTwo(item: any) {
    if (this.selectedIndex === 0 && this.items.indexOf(item) === this.items.length - 1) {
      return true;
    }
    return this.items.indexOf(item) < this.selectedIndex;
  }

  isThree(item: any) {
    if (this.selectedIndex === 0 && this.items.indexOf(item) === this.items.length - 1) {
      return false;
    }
    if (this.selectedIndex === this.items.length - 1 && this.items.indexOf(item) === 0) {
      return true;
    }

    return this.items.indexOf(item) > this.selectedIndex;
  }

  getClass(item: any) {

    let currentIndex = this.selectedIndex;
    if (this.items.indexOf(item) === this.selectedIndex) {
      return 'one';
    }
    if (this.selectedIndex === 0 && this.items.indexOf(item) === this.items.length - 1) {
      return 'two';
    }
    if (this.selectedIndex === this.items.length - 1 && this.items.indexOf(item) === 0) {
      return 'three';
    }
    if (this.selectedIndex > this.items.indexOf(item)) {
      return 'two';
    }
    return 'three';


  }

  get canGoUp() {
    return true;
    return this.selectedIndex < this.items.length - 1;
  }

  get canGoDown() {
    return true;
    return this.selectedIndex > 0;
  }

  getZIndex(item: any) {
    if (this.items.indexOf(item) === this.selectedIndex) {
      return -1;
    }
    if (this.items.indexOf(item) < this.selectedIndex) {
      return this.items.indexOf(item) - this.selectedIndex - 1;
    }

    return this.selectedIndex - this.items.indexOf(item) - 1;
  }

  moveDirection: 'UP' | 'DOWN' = 'UP';

  up() {
    if (this.selectedIndex < this.items.length - 1) {
      this.selectedIndex++;
      this.moveDirection = 'UP';
      this.setActive();
    } else {
      this.selectedIndex = 0;
      this.moveDirection = 'DOWN';
    }
  }

  down() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
      this.moveDirection = 'DOWN';
      this.setActive();
    } else {
      this.selectedIndex = this.items.length - 1;
      this.moveDirection = 'UP';
    }
  }

  setActive() {
    if (this.moveDirection === 'UP') {
      this.activeIndex = this.selectedIndex - 1;
      //this.nextActiveIndex = this.selectedIndex;
      this.prevActiveIndex = this.selectedIndex;
    }
    if (this.moveDirection === 'DOWN') {
      this.activeIndex = this.selectedIndex + 1;
      this.nextActiveIndex = this.selectedIndex;
    }
    setTimeout(() => {
      this.activeIndex = -1;
      this.nextActiveIndex = -1;
      this.prevActiveIndex = -1;
    }, 300);
  }
}
