import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-reactive-forms-test',
    imports: [ReactiveFormsModule, FormsModule],
    templateUrl: './reactive-forms-test.component.html',
    styleUrl: './reactive-forms-test.component.scss'
})
export class ReactiveFormsTestComponent {


  
  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
  
  }

   blah = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
  });

  onSubmit() {

  }
}
