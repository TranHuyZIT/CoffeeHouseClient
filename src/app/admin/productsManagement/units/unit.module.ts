import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedAdmin } from '../../shared/sharedAdmin.module';
import { UnitComponent } from './unit.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        ReactiveFormsModule,
        SharedAdmin,
        NgxPaginationModule,
        MatProgressSpinnerModule,
    ],
    declarations: [UnitComponent],
    exports: [UnitComponent],
})
export class UnitModule {}
