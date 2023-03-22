import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedHomeModule } from '../shared/shared.module';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';

@NgModule({
    declarations: [IndexComponent],
    exports: [IndexComponent],
    imports: [
        CommonModule,
        SharedHomeModule,
        IndexRoutingModule,
        SlickCarouselModule,
    ],
})
export class IndexModule {}
