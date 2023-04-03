import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'order-confirm',
    styleUrls: ['OrderConfirm.css'],
    templateUrl: 'OrderConfirm.html',
})
export class OrderConfirmComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<OrderConfirmComponent>
    ) {}
    closeDialog() {
        this.dialogRef.close();
    }
}
