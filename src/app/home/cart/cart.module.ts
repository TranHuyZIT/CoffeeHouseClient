import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { SharedHomeModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { OrderConfirmComponent } from './orderConfirm/OrderConfirm.component';

@NgModule({
    imports: [
        CommonModule,
        SharedHomeModule,
        CartRoutingModule,
        MatFormFieldModule,
        MatDatepickerModule,
        RouterModule,
        MatInputModule,
        NgxMatTimepickerModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        MatChipsModule,
        MatDialogModule,
        MatSelectModule,
    ],
    exports: [CartComponent, OrderConfirmComponent],
    declarations: [CartComponent, OrderConfirmComponent],
})
export class CartModule {}
