
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

@Component({
    selector: 'app-lottie-player',
    imports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './lottie-player.component.html',
    styleUrl: './lottie-player.component.scss'
})
export class LottiePlayerComponent implements AfterViewInit {
    @Input() height: string = 'unset';
    @Input() src: string;
    @Input() speed: number = 1;
    @Input() loop: boolean = true;
    @Input() autoPlay: boolean = true;
    @Input() intermission: number = 0;

    show = false;
    constructor() {
    }
    ngAfterViewInit(): void {
        setTimeout(()=> this.show = true);
        //this.show = true;
    }
}
