import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedAdmin } from '../shared/sharedAdmin.module';
import { PromotionDetailComponent } from './detail/promotionDetail.component';
import { PromotionManagementRoutingModule } from './promotionManagement-router.module';
import { PromotionManagementComponent } from './promotionManagement.component';

@NgModule({
    imports: [
        CommonModule,
        PromotionManagementRoutingModule,
        SharedAdmin,
        NgxPaginationModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxMatSelectSearchModule,
        MatSelectModule,
    ],
    exports: [PromotionManagementComponent, PromotionDetailComponent],
    declarations: [PromotionManagementComponent, PromotionDetailComponent],
})
export class PromotionManagementModule {}
