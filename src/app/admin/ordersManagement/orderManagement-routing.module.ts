import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/core/services/admin-guard.service';
import { DetailOrderComponent } from './detail/detail.component';
import { NotFoundDetailOrder } from './detail/notFound.component';
import { OrderManagementComponent } from './orderManagement.component';

const routes = [
    {
        path: '',
        component: OrderManagementComponent,
        canActivate: [AdminGuard],
    },
    {
        path: ':slug',
        component: DetailOrderComponent,
        canActivate: [AdminGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrderManagementRoutingModule {}
