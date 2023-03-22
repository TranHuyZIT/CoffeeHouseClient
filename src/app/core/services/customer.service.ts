import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class CustomerService {
    constructor(private apiService: ApiService) {}
    getAll(filters?: any) {
        const params = new HttpParams()
            .set('pageNo', filters?.pageNo || '')
            .set('name', filters?.name || '')
            .set('sortBy', filters?.sortBy || '')
            .set('pageSize', filters?.pageSize || '')
            .set('reverse', !!filters?.reverse);
        return this.apiService.get('/customer', params);
    }
}
