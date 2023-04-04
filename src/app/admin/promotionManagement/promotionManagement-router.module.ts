import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/core/services/admin-guard.service';
import { PromotionManagementComponent } from './promotionManagement.component';

const routes = [
    {
        path: '',
        component: PromotionManagementComponent,
        caActivate: [AdminGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PromotionManagementRoutingModule {}
