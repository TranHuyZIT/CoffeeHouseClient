import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import config from 'src/app/config/config';
import { InterceptorSkipHeader } from '../interceptors/http.token.interceptor';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable()
export class ProductService {
    constructor(
        private apiService: ApiService,
        private jwtService: JwtService,
        private http: HttpClient
    ) {}
    getOne(id: string) {
        return this.apiService.get('/product/' + id);
    }
    getAll(filters: any) {
        const params = new HttpParams()
            .set('pageNo', filters?.pageNo || '')
            .set('name', filters?.name || '')
            .set('sortBy', filters?.sortBy || '')
            .set('pageSize', filters?.pageSize || '')
            .set('reverse', !!filters?.reverse)
            .set('prodCategoryID', filters?.prodCategoryID || '');
        return this.apiService.get('/product', params);
    }
    getImage(id: number) {
        return this.apiService.get(`/product/image/${id}`);
    }
    add(image: File, data: any) {
        let headersConfig = new HttpHeaders({}).set(InterceptorSkipHeader, '');
        const baseURL: string = config.ENDPOINT;

        const token = this.jwtService.getToken();

        if (token) {
            console.log(token);
            headersConfig = headersConfig.append(
                'Authorization',
                `Bearer ${token}`
            );
        }
        const formData = new FormData();
        formData.append('image', image);
        formData.append('product', JSON.stringify(data));

        return this.http.post(`${baseURL}/admin/product`, formData, {
            headers: headersConfig,
        });
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
        formData.append('product', JSON.stringify(data));
        return this.http.put(`${baseURL}/admin/product/${id}`, formData, {
            headers: headersConfig,
        });
    }
}
