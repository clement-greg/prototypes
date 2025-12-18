import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import * as rive from "@rive-app/canvas";

@Component({
    selector: 'app-rive',
    imports: [CommonModule, MatButtonModule, FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule],
    templateUrl: './rive.component.html',
    styleUrl: './rive.component.scss'
})
export class RiveComponent {

  animations: string[];
  selectedAnimation: string;
  rive: rive.Rive;
  inputs: rive.StateMachineInput[];
  selectedInput: rive.StateMachineInput;

  constructor() {
    setTimeout(() => {
      const r = new rive.Rive({
        //src: "/assets/rive/untitled.riv",
        src: 'https://elevate2025.vercel.app/assets/rives/home-hero.riv',
        // OR the path to a discoverable and public Rive asset
        // src: '/public/example.riv',
        canvas: document.getElementById("canvas") as HTMLCanvasElement | OffscreenCanvas,
        autoplay: true,
        // artboard: "Arboard", // Optional. If not supplied the default is selected
        stateMachines: "home-hero",
        onLoad: () => {
          r.resizeDrawingSurfaceToCanvas();
          this.animations = [...r.animationNames];
          console.log(this.animations);
          console.log(r.stateMachineInputs('home-hero'));
          this.inputs = r.stateMachineInputs('home-hero');
        },
      });
      console.log(r);
      this.rive = r;


    }, 1000);
  }

  playAnimation() {
    this.selectedInput.fire();
    console.log('playing..................')
  }
}
