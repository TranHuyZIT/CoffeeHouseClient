import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedHomeModule } from '../shared/shared.module';
import { ProductDetailModule } from './detail/productDetail.module';
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
        NgxPaginationModule,
        ProductDetailModule,
    ],
})
export class IndexModule {}
