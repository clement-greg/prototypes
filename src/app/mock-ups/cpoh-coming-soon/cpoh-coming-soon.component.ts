import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cpoh-coming-soon',
  imports: [
    CommonModule,
  ],
  templateUrl: './cpoh-coming-soon.component.html',
  styleUrl: './cpoh-coming-soon.component.scss',
})
export class CpohComingSoonComponent {

  constructor() {
    setInterval(() => this.setDaysHoursMinutesSeconds(), 1000);
  }



  setDaysHoursMinutesSeconds() {
    const tilDate = new Date(2026, 2, 2);

    const now = new Date();
    const diff = tilDate.getTime() - now.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days')!.textContent = `Days: ${days}`;
    document.getElementById('hours')!.textContent = `Hours: ${hours}`;
    document.getElementById('minutes')!.textContent = `Minutes: ${minutes}`;
    document.getElementById('seconds')!.textContent = `Seconds: ${seconds}`;
  }
}
