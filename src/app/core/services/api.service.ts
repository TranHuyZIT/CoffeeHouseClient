import { Inject, Injectable, Injector } from '@angular/core';
import {
    HttpClient,
    HttpParams,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { JwtService } from './jwt.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs/operators';
import config from 'src/app/config/config';
import { NgZone } from '@angular/core';
@Injectable()
export class ApiService {
    private baseURL: string = config.ENDPOINT;
    constructor(
        @Inject(Injector) private readonly injector: Injector,
        private http: HttpClient,
        private jwtService: JwtService,
        private toastrService: ToastrService
    ) {}

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http
            .get(`${this.baseURL}${path}`, { params })
            .pipe(catchError(this.handleError));
    }

    put(path: string, body: Object = {}): Observable<any> {
        return this.http
            .put(`${this.baseURL}${path}`, JSON.stringify(body))
            .pipe(catchError(this.handleError));
    }

    post(path: string, body: Object = {}): Observable<any> {
        return this.http
            .post(`${this.baseURL}${path}`, JSON.stringify(body))
            .pipe(catchError(this.handleError));
    }

    delete(path: string): Observable<any> {
        return this.http
            .delete(`${this.baseURL}${path}`)
            .pipe(catchError(this.handleError));
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
        return throwError(() => {
            if (err.error && err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.error('An error occurred:', err.error.message);
                // throw new Error(`Có lỗi xảy ra, vui lòng thử lại sau`);
            } else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                console.log(err);

                throw new Error(err.message);
            }
        });
    }
    private get ngZone() {
        return this.injector.get(NgZone);
    }
}
