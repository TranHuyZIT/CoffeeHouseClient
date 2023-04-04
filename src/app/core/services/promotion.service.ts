import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, switchMap } from 'rxjs';
import config from 'src/app/config/config';
import { InterceptorSkipHeader } from '../interceptors/http.token.interceptor';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable()
export class PromotionService {
    constructor(
        private apiService: ApiService,
        private jwtService: JwtService,
        private http: HttpClient
    ) {}
    getAll(filters: any) {
        const params = new HttpParams()
            .set('pageNo', filters?.pageNo || '')
            .set('sortBy', filters?.sortBy || '')
            .set('pageSize', filters?.pageSize || '')
            .set('reverse', !!filters?.reverse);
        return this.apiService.get('/voucher', params);
    }
    getOne(id: any) {
        return this.apiService.get('/voucher/' + id);
    }
    add(body: any) {
        return this.apiService.post('/voucher', body);
    }
    update(id: any, body: any) {
        return this.apiService.put('/voucher/' + id, body);
    }
}
