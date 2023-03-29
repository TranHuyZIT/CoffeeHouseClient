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
            this.cartService.getCart(user.id + '').subscribe((cartData) => {
                this.cart = cartData;
                this.customer = cartData.customer;
                console.log(this.cart);
            });
        });
    }
    navigateToCart() {
        this.route.navigateByUrl('/home/cart');
    }
    cart: any;
    customer: any;
}
