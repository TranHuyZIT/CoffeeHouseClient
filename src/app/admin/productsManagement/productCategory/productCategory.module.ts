import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedAdmin } from '../../shared/sharedAdmin.module';
import { ProductCategory } from './productCategory.component';

@NgModule({
    declarations: [ProductCategory],
    imports: [
        CommonModule,
        FormsModule,
        MatProgressSpinnerModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        SharedAdmin,
    ],
    exports: [ProductCategory],
})
export class ProductCategoryModule {}
