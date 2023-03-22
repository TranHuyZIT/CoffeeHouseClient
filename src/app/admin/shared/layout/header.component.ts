import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'admin-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderLayoutComponent implements OnInit {
    constructor(private authService: AuthService) {}
    currentUser: any;
    ngOnInit() {
        this.authService.currentUser.subscribe((user) => {
            this.currentUser = user;
        });
    }
}
