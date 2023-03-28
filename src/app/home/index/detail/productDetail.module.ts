import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { SharedHomeModule } from '../../shared/shared.module';
import { ProductDetailComponent } from './productDetail.component';

@NgModule({
    imports: [
        SharedHomeModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatRadioModule,
    ],
    declarations: [ProductDetailComponent],
    exports: [],
})
export class ProductDetailModule {}
