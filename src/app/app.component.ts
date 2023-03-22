import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [],
})
export class AppComponent implements OnInit {
    constructor(private authService: AuthService) {}
    ngOnInit(): void {
        this.authService.populate();
    }
    title = 'CoffeeHouseTMA';
}
