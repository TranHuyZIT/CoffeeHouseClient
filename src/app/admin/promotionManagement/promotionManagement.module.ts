import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedAdmin } from '../shared/sharedAdmin.module';
import { PromotionManagementRoutingModule } from './promotionManagement-router.module';
import { PromotionManagementComponent } from './promotionManagement.component';

@NgModule({
    imports: [CommonModule, PromotionManagementRoutingModule, SharedAdmin],
    exports: [PromotionManagementComponent],
    declarations: [PromotionManagementComponent],
})
export class PromotionManagementModule {}
