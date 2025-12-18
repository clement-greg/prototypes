import { Component } from '@angular/core';

@Component({
    selector: 'app-native-dialog-test',
    imports: [],
    templateUrl: './native-dialog-test.component.html',
    styleUrl: './native-dialog-test.component.scss'
})
export class NativeDialogTestComponent {

  constructor() {
    setTimeout(() => {
      document.querySelector("button").addEventListener("click", (e) => {
        document.querySelector("dialog").showModal();
      });

      CSS.registerProperty({
        name: '--some-color',
        inherits: false,
        initialValue: '#777'
      });

      setTimeout(()=> {
        document.documentElement.style.setProperty('--some-color','#ff6a19');

      }, 1000)

      // setTimeout(()=> {
      //   CSS.registerProperty({
      //     name: '--some-color',
      //     inherits: false,
      //     initialValue: 'orange'
      //   });
      // }, 2000);

    }, 1000);
  }
}
