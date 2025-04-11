import { CommonModule } from '@angular/common';
import { Component, HostListener, NgZone } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-contractor-home-re-design',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './contractor-home-re-design.component.html',
  styleUrl: './contractor-home-re-design.component.scss'
})
export class ContractorHomeReDesignComponent {

  isScrolled = false;
  constructor(private zone: NgZone) {}

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true); //third parameter
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
      this.zone.run(() => {
          this.isScrolled = window.scrollY > 0;
      });
  }

  scroll = (event): void => {

  };
}
