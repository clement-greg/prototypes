import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appInfoCallOut]',
  standalone: true
})
export class InfoCallOutDirective {

  @Input() appInfoCallOut: string;
  @Input() heading: string;
  @Input() icon: string;
  @Input() delay = 1000;
  @Input() timeout = 8000;
  @Input() position: 'Left' | 'Right' | 'Top' | 'Bottom' = 'Bottom';

  constructor(private el: ElementRef) {

    //el.nativeElement.title = this.appInfoCallOut;

    setTimeout(() => {

      setTimeout(() => {
        const callout = document.createElement('div');
        callout.classList.add('info-call-out');
        callout.classList.add(this.position.toLowerCase());

        if (this.icon) {
          const iconDiv = document.createElement('div');
          iconDiv.classList.add('center');
          iconDiv.style.marginTop = '-20px';
          const icon = document.createElement('span');
          icon.innerText = 'info';
          icon.classList.add('material-icons');
          iconDiv.appendChild(icon);
          callout.appendChild(iconDiv);
        }

        if (this.heading) {
          const heading = document.createElement('h2');
          heading.innerText = this.heading;
          callout.appendChild(heading);
        }


        const textSpan = document.createElement('span');
        textSpan.classList.add('call-out-text');
        textSpan.innerHTML = this.appInfoCallOut;
        callout.appendChild(textSpan);

        this.el.nativeElement.parentNode.appendChild(callout);
        this.el.nativeElement.parentNode.style.position = 'relative';
        if (this.position === 'Bottom') {
          callout.style.top = `${el.nativeElement.clientHeight}px`;
        } else if (this.position === 'Top') {
          callout.style.top = `-${callout.clientHeight}px`;
        } else if(this.position === 'Left') {
          callout.style.left = `-${callout.clientWidth + 15}px`;
          callout.style.top = '0px';
        } else if(this.position === 'Right') {
          callout.style.left = `${el.nativeElement.clientWidth + 15}px`;
          callout.style.top = '0px';
        }

        callout.addEventListener('click', e => {
          callout.parentNode.removeChild(callout);
        });
        setTimeout(() => {
          callout.parentNode.removeChild(callout);
        }, this.timeout);
        setTimeout(() => {
          callout.classList.add('removing');
        }, this.timeout - 500);
      }, this.delay);
    });
  }

}
