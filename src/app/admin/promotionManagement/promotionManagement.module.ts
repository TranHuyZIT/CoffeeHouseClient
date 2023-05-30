import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedAdmin } from '../shared/sharedAdmin.module';
import { PromotionDetailComponent } from './detail/promotionDetail.component';
import { PromotionManagementRoutingModule } from './promotionManagement-router.module';
import { PromotionManagementComponent } from './promotionManagement.component';
import SendCodeDialog from './sendCodeDialog/SendCodeDialog.component';

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
        MatOptionModule,
        MatSelectModule,
    ],
    exports: [
        PromotionManagementComponent,
        PromotionDetailComponent,
        SendCodeDialog,
    ],
    declarations: [
        PromotionManagementComponent,
        PromotionDetailComponent,
        SendCodeDialog,
    ],
})
export class PromotionManagementModule {}
