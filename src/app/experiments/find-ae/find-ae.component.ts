
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-find-ae',
    imports: [FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
    templateUrl: './find-ae.component.html',
    styleUrl: './find-ae.component.scss'
})
export class FindAeComponent {

  constructor(
        private http: HttpClient,) {

  }
  postalCode: string = '';

  findAE() {
    const url = `https://test-api2.upkeeplabs.com/api/entity/find-account-executive-by-postalcode/${this.postalCode}`;
    this.http.get(url).subscribe((response: any) => {
      // Handle the response here
    }, (error) => {
      console.error('Error fetching data:', error);
      // Handle the error here
    });


  }
}
