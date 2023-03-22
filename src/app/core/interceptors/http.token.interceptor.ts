import { Injectable, Injector } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

import { JwtService } from '../services/jwt.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
    constructor(
        private jwtService: JwtService,
        private toasrtService: ToastrService
    ) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (req.headers.has(InterceptorSkipHeader)) {
            const headers = req.headers.delete(InterceptorSkipHeader);
            return next.handle(req.clone({ headers }));
        }
        const headersConfig = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: '',
        };

        const token = this.jwtService.getToken();

        if (token) {
            headersConfig['Authorization'] = `Bearer ${token}`;
        }

        const request = req.clone({ setHeaders: headersConfig });
        return next.handle(request);
    }
}
export const InterceptorSkipHeader = 'X-Skip-Interceptor';
