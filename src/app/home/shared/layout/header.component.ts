import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    selector: 'home-header',
})
export class HomeHeaderComponent implements OnInit {
    constructor(
        private cartService: CartService,
        private authService: AuthService,
        private customerService: CustomerService,
        private route: Router
    ) {}
    ngOnInit(): void {
        this.authService.currentUser.subscribe((user) => {
            if (!user) return;
            this.cartService.getCart(user.id + '').subscribe((cartData) => {
                this.cart = cartData;
                this.customer = cartData.customer;
            });
        });
    }
    navigateToCart() {
        this.route.navigateByUrl('/home/cart');
    }
    navigateToProfile() {
        this.route.navigateByUrl('/home/profile');
    }
    navigateToAdmin() {
        this.route.navigateByUrl('/admin/product-mgmt');
    }
    logOut() {
        this.authService.purgeAuth();
    }
    cart: any;
    customer: any;
}
