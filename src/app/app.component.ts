import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import WebsocketService from './core/services/webSocket.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [],
})
export class AppComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private webSocketService: WebsocketService
    ) {}
    ngOnInit(): void {
        this.authService.populate();
        this.webSocketService.connect();
    }
    title = 'CoffeeHouseTMA';
}
