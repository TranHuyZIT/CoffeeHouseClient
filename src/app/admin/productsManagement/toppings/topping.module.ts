import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedAdmin } from '../../shared/sharedAdmin.module';
import { TooppingRoutingModule } from './topping-router.module';
import { ToppingComponent } from './topping.component';

@NgModule({
    imports: [
        TooppingRoutingModule,
        SharedAdmin,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        NgxPaginationModule,
        MatProgressSpinnerModule,
    ],
    exports: [ToppingComponent],
    declarations: [ToppingComponent],
})
export class ToppingModule {}
