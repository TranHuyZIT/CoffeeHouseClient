import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundDetailOrder } from './admin/ordersManagement/detail/notFound.component';
import { AppComponent } from './app.component';
import { AdminGuard } from './core/services/admin-guard.service';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
            import('./home/index/index.module').then((m) => m.IndexModule),
    },
    {
        path: 'home',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./home/index/index.module').then(
                        (m) => m.IndexModule
                    ),
            },
        ],
    },
    {
        path: 'admin',
        children: [
            {
                path: 'account-mgmt',
                canActivate: [AdminGuard],
                loadChildren: () =>
                    import('./admin/accounts/accounts.module').then(
                        (m) => m.AccountModule
                    ),
            },
            {
                path: 'product-mgmt',
                canActivate: [AdminGuard],
                loadChildren: () =>
                    import(
                        './admin/productsManagement/productsManagement.module'
                    ).then((m) => m.ProductsManagementModule),
            },
            {
                path: 'order-mgmt',
                canActivate: [AdminGuard],
                loadChildren: () =>
                    import(
                        './admin/ordersManagement/orderManagement.module'
                    ).then((m) => m.OrderManagementModule),
            },
        ],
    },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
