import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-alert-dialog',
    imports: [MatDialogModule, MatButtonModule],
    templateUrl: './alert-dialog.component.html',
    styleUrl: './alert-dialog.component.scss'
})
export class AlertDialogComponent {
    public title: string = '';
    public message: string = '';

    constructor(public dialogRef: MatDialogRef<AlertDialogComponent>) {

    }
}
