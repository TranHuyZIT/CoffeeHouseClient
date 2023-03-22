import {
    HttpEvent,
    HttpEventType,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    filter,
    Observable,
    map,
    catchError,
    throwError,
    debounceTime,
} from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class HandleResponseInterceptor implements HttpInterceptor {
    constructor(
        private toasrtService: ToastrService,
        private route: Router,
        private authService: AuthService
    ) {}
    intercept(
        httpRequest: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(httpRequest).pipe(
            debounceTime(300),
            map((event) => {
                console.log(event);
                if (event instanceof HttpResponse) {
                    if (event.status === 200) return event.clone();
                }
                return event;
            }),
            catchError((err) => {
                return throwError(() => new Error(err.error.message));
            })
        );
    }
}
