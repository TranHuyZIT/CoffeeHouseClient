import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { ApiService } from './services/api.service';
import { AuthGuard } from './services/auth-guard.service';
import { JwtService } from './services/jwt.service';
import { NoAuthGuard } from './services/no-auth-guard';
import { ToastrService } from 'ngx-toastr';
import { HandleResponseInterceptor } from './interceptors/http.handleResponse.interceptor';
import { AuthService } from './services/auth.service';
import { AdminGuard } from './services/admin-guard.service';
import { AccountService } from './services/account.service';
import { ProductCategoryService } from './services/productCategory.service';
import { ProductService } from './services/product.service';
import { ToppingService } from './services/topping.service';
import { UnitService } from './services/unit.service';
import { CustomerService } from './services/customer.service';
import { OrderService } from './services/order.service';
import { RouterModule } from '@angular/router';
import { CartService } from './services/cart.service';

@NgModule({
    imports: [CommonModule, RouterModule],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpTokenInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HandleResponseInterceptor,
            multi: true,
        },
        ApiService,
        NoAuthGuard,
        AuthGuard,
        AdminGuard,
        JwtService,
        AuthService,
        AccountService,
        ProductCategoryService,
        ProductService,
        ToppingService,
        UnitService,
        CustomerService,
        OrderService,
        CartService,
    ],
    declarations: [],
})
export class CoreModule {}
