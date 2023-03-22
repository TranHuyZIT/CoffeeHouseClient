import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedAdmin } from '../shared/sharedAdmin.module';
import { AccountComponent } from './accounts.component';
import { AccountRoutingModule } from './accounts.routing.module';
import { MatSelectModule } from '@angular/material/select';
import { OrderModule } from 'ngx-order-pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    imports: [
        NgxPaginationModule,
        OrderModule,
        CommonModule,
        SharedAdmin,
        AccountRoutingModule,
        MatFormFieldModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatProgressSpinnerModule,
    ],
    declarations: [AccountComponent],
    providers: [],
})
export class AccountModule {}
