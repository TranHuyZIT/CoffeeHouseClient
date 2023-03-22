import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/core/services/admin-guard.service';
import { ProductManagement } from './productManagement.component';

const routes: Routes = [
    {
        path: '',
        component: ProductManagement,
        canActivate: [AdminGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductManagementRoutingModule {}
