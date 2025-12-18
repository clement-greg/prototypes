import { Component } from '@angular/core';
import { PolaroidCarouselComponent } from "../polaroid-carousel/polaroid-carousel.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-polaroid-carousel-demo',
    imports: [CommonModule, PolaroidCarouselComponent, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
    templateUrl: './polaroid-carousel-demo.component.html',
    styleUrl: './polaroid-carousel-demo.component.scss'
})
export class PolaroidCarouselDemoComponent {

  size = 500;
  sizes = [
    100,
    200,
    300,
    400,
    500,
    600,
    700,
  ]

  items =  [
    { id: 1, name: 'Item 1', url: 'https://www.elevatehomescriptions.com/_next/image?url=%2Fassets%2Fimages%2Fhomeownership-01.jpg&w=1536&q=80&dpl=dpl_9cD42nJHbZ4w7hoAmfRXXRkEs8vE', text: 'Hello from California' },
    { id: 2, name: 'Item 2', url: 'https://www.elevatehomescriptions.com/_next/image?url=%2Fassets%2Fimages%2Fhomeownership-02.jpg&w=1536&q=80&dpl=dpl_9cD42nJHbZ4w7hoAmfRXXRkEs8vE', text: 'This dudes a lazy butt!!!' },
    { id: 3, name: 'Item 3', url: 'https://www.elevatehomescriptions.com/_next/image?url=%2Fassets%2Fimages%2Fhomeownership-03.jpg&w=1536&q=80&dpl=dpl_9cD42nJHbZ4w7hoAmfRXXRkEs8vE', text: 'Homeownership is the American dream' },
    { id: 4, name: 'Item 4', url: 'https://www.elevatehomescriptions.com/_next/image?url=%2Fassets%2Fimages%2Fhomeownership-04.jpg&w=1536&q=80&dpl=dpl_9cD42nJHbZ4w7hoAmfRXXRkEs8vE', text: 'On app to rule them all!!!!' },
    { id: 5, name: 'Item 5', url: 'https://www.elevatehomescriptions.com/_next/image?url=%2Fassets%2Fimages%2Fhomeownership-05.jpg&w=1536&q=80&dpl=dpl_9cD42nJHbZ4w7hoAmfRXXRkEs8vE', text: 'Homeownership can be bi-polar' },
  ]
}
