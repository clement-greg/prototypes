import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-input-dialog',
    imports: [CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
    ],
    templateUrl: './input-dialog.component.html',
    styleUrl: './input-dialog.component.scss',
})
export class InputDialogComponent {
    readonly dialogRef = inject(MatDialogRef<InputDialogComponent>);
    readonly data = inject<any>(MAT_DIALOG_DATA);

    save() {
        this.dialogRef.close(this.data.value);
    }
}
