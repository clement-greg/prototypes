
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-search-loading',
    imports: [MatProgressSpinnerModule],
    templateUrl: './search-loading.component.html',
    styleUrl: './search-loading.component.scss'
})
export class SearchLoadingComponent {

}
