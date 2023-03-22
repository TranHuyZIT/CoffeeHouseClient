import { Injectable } from '@angular/core';
import {
    HttpHeaders,
    HttpClient,
    HttpParams,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { JwtService } from './jwt.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs/operators';
import config from 'src/app/config/config';

@Injectable()
export class ApiService {
    private baseURL: string = config.ENDPOINT;
    constructor(
        private http: HttpClient,
        private jwtService: JwtService,
        private toastService: ToastrService
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
            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.error('An error occurred:', err.error.message);
                this.toastService.error(`Có lỗi xảy ra, vui lòng thử lại sau`);
                throw new Error(`Có lỗi xảy ra, vui lòng thử lại sau`);
            } else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,

                throw new Error(`Có lỗi xảy ra: ${err.message}`);
            }
        });
    }
}
