import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-logout-confirmation-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogActions,
        MatDialogContent,
        MatButton
    ],
    templateUrl: './logout-confirmation-dialog.component.html',
    styleUrls: ['./logout-confirmation-dialog.component.scss']
})

export class LogoutConfirmationDialogComponent {
    constructor(private dialogRef: MatDialogRef<LogoutConfirmationDialogComponent>,) { }

    close(result: boolean) {
        this.dialogRef.close(result);
    }
}
