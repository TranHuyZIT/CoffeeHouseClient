import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedAdmin } from '../../shared/sharedAdmin.module';
import { Product } from './product.component';
import { MatChipGrid, MatChipsModule } from '@angular/material/chips';
@NgModule({
    declarations: [Product],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        NgxPaginationModule,
        OrderModule,
        SharedAdmin,
        MatSelectModule,
        MatChipsModule,
    ],
    exports: [Product],
})
export class ProductModule {}
