import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class ToppingService {
    constructor(private apiSerivce: ApiService) {}
    getAll(filters?: any) {
        const params = new HttpParams()
            .set('pageNo', filters?.pageNo || '')
            .set('name', filters?.name || '')
            .set('productId', filters?.productId || '')
            .set('sortBy', filters?.sortBy || '')
            .set('pageSize', filters?.pageSize || '')
            .set('reverse', !!filters?.reverse);
        return this.apiSerivce.get('/topping', params);
    }
    add(body: any) {
        return this.apiSerivce.post('/topping', body);
    }
    update(id: any, body: any) {
        return this.apiSerivce.put(`/topping/${id}`, body);
    }
    delete(id: any) {
        return this.apiSerivce.delete(`/topping/${id}`);
    }
}
