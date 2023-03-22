import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementRoutingModule } from './productManagement.routing.module';
import { ProductManagement } from './productManagement.component';
import { SharedAdmin } from '../shared/sharedAdmin.module';
import { Product } from './product/product.component';
import { ProductModule } from './product/product.module';
import { ProductCategoryModule } from './productCategory/productCategory.module';
import { ToppingModule } from './toppings/topping.module';
import { UnitModule } from './units/unit.module';

@NgModule({
    declarations: [ProductManagement],
    imports: [
        CommonModule,
        ProductManagementRoutingModule,
        SharedAdmin,
        ProductModule,
        ProductCategoryModule,
        ToppingModule,
        UnitModule,
    ],
})
export class ProductsManagementModule {}
