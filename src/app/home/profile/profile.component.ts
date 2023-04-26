import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
    selector: 'profile-component',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.css'],
})
export class ProfileComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private customerService: CustomerService
    ) {}
    currentCustomer: any;
    ngOnInit(): void {
        this.authService.currentUser.subscribe((user: any) => {
            this.customerService.getByUserId(user.id).subscribe((customer) => {
                this.currentCustomer = customer;
            });
        });
    }
}
