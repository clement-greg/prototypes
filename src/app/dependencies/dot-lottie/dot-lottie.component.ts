import { Component } from '@angular/core';
import { DotLottie } from '@lottiefiles/dotlottie-web';

@Component({
  selector: 'app-dot-lottie',
  standalone: true,
  imports: [],
  templateUrl: './dot-lottie.component.html',
  styleUrl: './dot-lottie.component.scss'
})
export class DotLottieComponent {

  constructor() {
    this.doLottie();
  }

  doLottie() {
    if(!document.getElementById('dotlottie-canvas')) {
      setTimeout(()=> this.doLottie(), 100);
      return;
      
    }

    const dotLottie = new DotLottie({
      autoplay: true,
      loop: true,
      canvas: document.querySelector('#dotlottie-canvas'),
      src: "/assets/lottie/ac-animated-final.lottie", // or .json file
  });

  }
}
