import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-dark-button',
    imports: [CommonModule],
    templateUrl: './dark-button.component.html',
    styleUrl: './dark-button.component.scss'
})
export class DarkButtonComponent {
  mouseDown = false;
}
