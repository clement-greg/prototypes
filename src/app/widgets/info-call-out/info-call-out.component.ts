import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { InfoCallOutDirective } from '../info-call-out.directive';

@Component({
  selector: 'app-info-call-out',
  standalone: true,
  imports: [MatButtonModule, InfoCallOutDirective],
  templateUrl: './info-call-out.component.html',
  styleUrl: './info-call-out.component.scss'
})
export class InfoCallOutComponent {

}
