import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import WebsocketService from 'src/app/core/services/webSocket.service';

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
        private websocketService: WebsocketService,
        private route: Router
    ) {}
    hasUnreadNotification = false;
    currentUser: any;
    ngOnInit(): void {
        this.authService.currentUser.subscribe((user) => {
            if (!user) return;
            this.currentUser = user;
            this.cartService.getCart(user.id + '').subscribe((cartData) => {
                this.cart = cartData;
                this.customer = cartData.customer;
            });
        });
        this.websocketService.hasUnreadNotificationObservable.subscribe(
            (hasUnreadNotification: any) => {
                this.hasUnreadNotification = hasUnreadNotification;
            }
        );
    }
    loadedNotifications: any[] = [];
    pageNo = 0;
    openNotification = false;
    isLastPage = false;
    openNotifications() {
        if (this.openNotification) {
            this.openNotification = false;
            return;
        }
        this.openNotification = true;
        this.pageNo = 0;
        this.websocketService
            .checkNotification({
                pageNo: this.pageNo,
                userId: this.currentUser.id,
            })
            .subscribe((response: any) => {
                this.loadedNotifications = response.content;
                this.pageNo += 1;
                this.isLastPage = response.last;
            });
    }
    loadMoreNotifications() {
        this.websocketService
            .checkNotification({
                pageNo: this.pageNo,
                userId: this.currentUser.id,
            })
            .subscribe((response: any) => {
                this.loadedNotifications = [
                    ...this.loadedNotifications,
                    ...response.content,
                ];
                this.pageNo += 1;
                this.isLastPage = response.last;
            });
    }
    toggleNotification() {
        this.openNotification = !this.openNotification;
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
