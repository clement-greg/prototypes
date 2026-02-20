import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-polariod-carousel-2',
  imports: [],
  templateUrl: './polariod-carousel-2.component.html',
  styleUrl: './polariod-carousel-2.component.scss',
})
export class PolariodCarousel2Component {

    @Input() items: Item[] = [
    { id: 1, name: 'Item 1', url: 'https://www.elevatehomescriptions.com/_next/image?url=%2Fassets%2Fimages%2Fhomeownership-01.jpg&w=1536&q=80&dpl=dpl_9cD42nJHbZ4w7hoAmfRXXRkEs8vE', text: 'Hello from California' },
    { id: 2, name: 'Item 2', url: 'https://www.elevatehomescriptions.com/_next/image?url=%2Fassets%2Fimages%2Fhomeownership-02.jpg&w=1536&q=80&dpl=dpl_9cD42nJHbZ4w7hoAmfRXXRkEs8vE', text: 'This dudes a lazy butt!!!' },
    { id: 3, name: 'Item 3', url: 'https://www.elevatehomescriptions.com/_next/image?url=%2Fassets%2Fimages%2Fhomeownership-03.jpg&w=1536&q=80&dpl=dpl_9cD42nJHbZ4w7hoAmfRXXRkEs8vE', text: 'Homeownership is the American dream' },
    { id: 4, name: 'Item 4', url: 'https://www.elevatehomescriptions.com/_next/image?url=%2Fassets%2Fimages%2Fhomeownership-04.jpg&w=1536&q=80&dpl=dpl_9cD42nJHbZ4w7hoAmfRXXRkEs8vE', text: 'On app to rule them all!!!!' },
    { id: 5, name: 'Item 5', url: 'https://www.elevatehomescriptions.com/_next/image?url=%2Fassets%2Fimages%2Fhomeownership-05.jpg&w=1536&q=80&dpl=dpl_9cD42nJHbZ4w7hoAmfRXXRkEs8vE', text: 'Homeownership can be bi-polar' },
    { id: 6, name: 'Item 6', url: 'https://www.datocms-assets.com/160911/1755173417-download-brochure.jpg?dpr=1.5', text: 'Just another polaroid' },
    { id: 7, name: 'Item 7', url: 'https://www.datocms-assets.com/160911/1751469733-homeowners_text_image_1-1.png?dpr=1.5', text: 'Friendly AI couple' },
    { id: 8, name: 'Item 8', url: 'https://www.datocms-assets.com/160911/1751469990-homeowners_reward-1.png?dpr=1.5', text: 'Another AI Couple' },
  ];

  currentIndex = 0;
  animating: 'forward' | 'backward' | null = null;

  getVisibleItems(): Item[] {
    const len = this.items.length;
    if (len < 3) return this.items;

    const leftIndex = (this.currentIndex - 1 + len) % len;
    const rightIndex = (this.currentIndex + 1) % len;

    return [
      this.items[leftIndex],
      this.items[this.currentIndex],
      this.items[rightIndex],
    ];
  }

  next(): void {
    if (this.animating) return;

    this.animating = 'forward';
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
      this.animating = null;
    }, 600);
  }

  prev(): void {
    if (this.animating) return;

    this.animating = 'backward';
    setTimeout(() => {
      this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
      this.animating = null;
    }, 600);
  }
}

class Item {
  url: string;
  text: string;
  id: number;
  name: string;
}
