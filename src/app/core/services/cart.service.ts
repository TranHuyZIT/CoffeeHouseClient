import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class CartService {
    constructor(private apiService: ApiService) {}
    addDetail(body: any) {
        return this.apiService.post('/cart/detail', body);
    }
    getCart(customerId: string) {
        return this.apiService.get('/cart/' + customerId);
    }
    removeDetail(id: any) {
        return this.apiService.delete('/cart/detail/' + id);
    }
}
