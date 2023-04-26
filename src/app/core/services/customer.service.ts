import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'src/app/config/config';
import { InterceptorSkipHeader } from '../interceptors/http.token.interceptor';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable()
export class CustomerService {
    constructor(
        private apiService: ApiService,
        private jwtService: JwtService,
        private http: HttpClient
    ) {}
    getAll(filters?: any) {
        const params = new HttpParams()
            .set('pageNo', filters?.pageNo || '')
            .set('name', filters?.name || '')
            .set('sortBy', filters?.sortBy || '')
            .set('pageSize', filters?.pageSize || '')
            .set('reverse', !!filters?.reverse);
        return this.apiService.get('/user/customer', params);
    }
    getByUserId(id: string) {
        return this.apiService.get('/user/customer/' + id);
    }
    update(image: File, data: any, id: any) {
        const headersConfig = new HttpHeaders({}).set(
            InterceptorSkipHeader,
            ''
        );
        const baseURL: string = config.ENDPOINT;

        const token = this.jwtService.getToken();
        if (token) {
            headersConfig.append('Authorization', `Bearer ${token}`);
        }
        const formData = new FormData();
        if (image) formData.append('image', image);
        formData.append('address', data);
        return this.http.put(`${baseURL}/user/customer/${id}`, formData, {
            headers: headersConfig,
        });
    }
    updateUser(id: any, data: any) {
        return this.apiService.put('/user/account/' + id, data);
    }
}
