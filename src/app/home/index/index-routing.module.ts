import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductDetailComponent } from './detail/productDetail.component';
import { IndexComponent } from './index.component';

const routes = [
    {
        path: '',
        component: IndexComponent,
    },
    {
        path: 'product/:slug',
        component: ProductDetailComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class IndexRoutingModule {}
