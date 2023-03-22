import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SharedAdmin } from '../../shared/sharedAdmin.module';
import { DetailOrderComponent } from './detail.component';
import { NotFoundDetailOrder } from './notFound.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        RouterModule,
        SharedAdmin,
        MatChipsModule,
        NgxMatSelectSearchModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    declarations: [DetailOrderComponent, NotFoundDetailOrder],
    exports: [DetailOrderComponent, NotFoundDetailOrder],
})
export class DetailOrderModule {}
