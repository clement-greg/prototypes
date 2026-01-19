import { Injectable, ViewContainerRef } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { AlertDialogComponent } from "./alert-dialog/alert-dialog.component";
import { InputDialogComponent } from "./input-dialog/input-dialog.component";

@Injectable({ providedIn: "root" })
export class DialogsService {
    constructor(
        private dialog: MatDialog
    ) { } 
 
    public confirm(title: string, message: string): Observable<boolean> {

        let dialogRef: MatDialogRef<ConfirmDialogComponent>;
        const config = new MatDialogConfig();

        dialogRef = this.dialog.open(ConfirmDialogComponent, config);

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed() as any;
    }

    public alert(title: string, message: string): Observable<boolean> {

        let dialogRef: MatDialogRef<AlertDialogComponent>;
        const config = new MatDialogConfig();

        dialogRef = this.dialog.open(AlertDialogComponent, config);

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed() as any;
    }

    public input(prompt: string, value: string): Observable<string> {

        let dialogRef: MatDialogRef<InputDialogComponent>;
        const config = new MatDialogConfig();
        config.data = {
            title: prompt,
            value: value
        }
        dialogRef = this.dialog.open(InputDialogComponent, config);

        return dialogRef.afterClosed() as any;
    }
} 