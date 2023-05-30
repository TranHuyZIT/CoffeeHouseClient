import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
@Injectable()
export default class WebsocketService {
    stompClient: Stomp.Client;
    socket: WebSocket;
    hasUnreadNotification = new BehaviorSubject(
        localStorage.getItem('hasUnreadNotification') == 'true' || false
    );
    hasUnreadNotificationObservable = this.hasUnreadNotification.asObservable();
    currentUser: any;
    constructor(
        private toastrService: ToastrService,
        private http: HttpClient,
        private authService: AuthService
    ) {
        this.socket = new SockJS('http://localhost:9000/ws');
        this.stompClient = Stomp.over(this.socket);
        this.currentUser = this.authService.currentUser$.subscribe(
            (user) => (this.currentUser = user)
        );
    }
    connect() {
        this.stompClient.connect({}, (frame) => {
            console.log('Connected');
            // Listen to all notifications
            this.stompClient.subscribe('/all', (message) =>
                this.showMessage(message)
            );
            // Listen to private notifications
            this.stompClient.subscribe(
                `/specific/${this.currentUser.id}`,
                (message) => this.showMessage(message)
            );
        });
    }
    showMessage(message: any) {
        const messageData = JSON.parse(message.body);
        this.toastrService.info(messageData.message, messageData.subject, {
            positionClass: 'toast-top-center',
            timeOut: 10000,
        });
        this.hasUnreadNotification.next(true);
        localStorage.setItem('hasUnreadNotification', 'true');
    }
    checkNotification(filters?: any) {
        this.hasUnreadNotification.next(false);
        localStorage.setItem('hasUnreadNotification', 'false');
        const params = new HttpParams()
            .set('pageNo', filters?.pageNo || 0)
            .set('sortBy', filters?.sortBy || 'createdAt')
            .set('pageSize', filters?.pageSize || 4)
            .set('userId', filters.userId)
            .set('reverse', !!filters?.reverse);
        return this.http.get('http://localhost:9000/api/v1/', { params });
    }
    onConnected() {
        console.log('Connected');
    }
    onError() {
        console.log('Error occured');
    }
}
