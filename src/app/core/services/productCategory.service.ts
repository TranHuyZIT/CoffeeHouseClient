import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, switchMap } from 'rxjs';
import config from 'src/app/config/config';
import { InterceptorSkipHeader } from '../interceptors/http.token.interceptor';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable()
export class ProductCategoryService {
    constructor(
        private apiService: ApiService,
        private jwtService: JwtService,
        private http: HttpClient
    ) {}
    getAll() {
        return this.apiService.get('/prod-category');
    }
    getImage(id: number) {
        return this.apiService.get(`/prod-category/image/${id}`);
    }
    add(image: File, data: any) {
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
        formData.append('image', image);
        formData.append('name', data.name);
        return this.http
            .post(`${baseURL}/admin/prod-category`, formData, {
                headers: headersConfig,
            })
            .pipe(tap(console.log));
    }
    update(image: File, data: any) {
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
        formData.append('image', image);
        formData.append('name', data.name);
        return this.http
            .put(`${baseURL}/admin/prod-category/${data.id}`, formData, {
                headers: headersConfig,
            })
            .pipe(tap(console.log));
    }
}
