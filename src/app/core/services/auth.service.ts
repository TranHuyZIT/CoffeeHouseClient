import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    BehaviorSubject,
    Observable,
    ObservableInput,
    ReplaySubject,
    Subject,
    tap,
    throwError,
} from 'rxjs';
import { catchError, distinctUntilChanged, map } from 'rxjs/operators';
import config from '../../config/config';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import UserRole from '../../enum/user-role.enum';
import AuthenticateRequest from '../../interfaces/user/AuthenticateRequest.interface';
import UserRegister from '../../interfaces/user/userRegister.interface';
import UserResponse from '../../interfaces/user/userResponse.interface';
import { CustomerService } from './customer.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    baseURL: string = config.ENDPOINT;
    private currentUserSubject = new BehaviorSubject<UserResponse>(
        {} as UserResponse
    );
    private currentCustomerSubject = new BehaviorSubject<any>({});
    public currentCustomer = this.currentCustomerSubject.asObservable();
    public currentUser = this.currentUserSubject
        .asObservable()
        .pipe(distinctUntilChanged());
    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    private isAdminSubject = new ReplaySubject<boolean>(1);
    public isAdmin = this.isAdminSubject.asObservable();

    constructor(
        private apiService: ApiService,
        private jwtService: JwtService,
        private router: Router,
        private customerService: CustomerService
    ) {}

    // Load user info with token in local storage (if any)
    // Run once on application startup
    populate() {
        const that = this;
        if (this.jwtService.getToken()) {
            this.currentUser$.subscribe({
                next(data) {
                    that.setAuth(data);
                },
                error(err) {
                    that.purgeAuth();
                    that.router.navigateByUrl('/login');
                },
            });
        } else {
            this.purgeAuth();
        }
    }

    setAuth(user: UserResponse) {
        this.jwtService.saveToken(user.token);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
        this.isAdminSubject.next(
            user.role === UserRole.ADMIN || user.role === UserRole.SUPERADMIN
        );
        this.customerService
            .getByUserId(user.id + '')
            .subscribe((customerData) => {
                this.currentCustomerSubject.next(customerData);
            });
    }
    purgeAuth() {
        this.jwtService.destroyToken();
        this.currentUserSubject.next({} as UserResponse);
        this.isAuthenticatedSubject.next(false);
        this.isAdminSubject.next(false);
    }
    attemptAuth(
        type: string,
        credentials: AuthenticateRequest
    ): Observable<UserResponse> {
        const route = type === 'login' ? '/login' : '/register';
        return this.apiService.post('/auth' + route, credentials).pipe(
            tap(console.log),
            map((data) => {
                this.setAuth(data);
                return data;
            })
        );
    }

    currentUser$ = <Observable<UserResponse>>(
        this.apiService.get(`/auth/identity`)
    );
}
