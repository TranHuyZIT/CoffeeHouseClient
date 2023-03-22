import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedAdmin } from '../shared/sharedAdmin.module';
import { DetailOrderComponent } from './detail/detail.component';
import { DetailOrderModule } from './detail/detail.module';
import { NotFoundDetailOrder } from './detail/notFound.component';
import { OrderManagementRoutingModule } from './orderManagement-routing.module';
import { OrderManagementComponent } from './orderManagement.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        SharedAdmin,
        OrderManagementRoutingModule,
        MatSelectModule,
        NgxPaginationModule,
        DetailOrderModule,
    ],
    declarations: [OrderManagementComponent],
    exports: [OrderManagementComponent],
})
export class OrderManagementModule {}
