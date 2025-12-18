
import { Component } from '@angular/core';

@Component({
    selector: 'app-clip-path-test',
    imports: [],
    templateUrl: './clip-path-test.component.html',
    styleUrl: './clip-path-test.component.scss'
})
export class ClipPathTestComponent {

  width = 0;

  constructor() {
    //this.incrementUp();
  }

  // incrementUp() {
  //   this.width++;
  //   if (this.width < 100) {
  //     setTimeout(() => this.incrementUp(), 200);
  //   }
  // }

  // get widthCss() {
  //   return `${this.width}%`;
  // }
}
