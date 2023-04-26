import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedHomeModule } from '../shared/shared.module';
import { InfoComponent } from './info/info.component';
import { OrderedComponent } from './ordered/ordered.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        SharedHomeModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
    ],
    declarations: [ProfileComponent, InfoComponent, OrderedComponent],
    exports: [ProfileComponent, InfoComponent, OrderedComponent],
})
export class ProfileModule {}
