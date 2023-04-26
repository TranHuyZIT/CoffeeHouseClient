import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class CartService {
    constructor(private apiService: ApiService) {}
    addDetail(body: any) {
        return this.apiService.post('/user/cart/detail', body);
    }
    addVoucherForCart(voucherId: any, customerId: any) {
        console.log(voucherId);

        return this.apiService.post(
            '/user/cart/addvoucher/' + customerId,
            voucherId
        );
    }
    deleteVoucherForCart(customerId: any) {
        return this.apiService.delete('/user/cart/deletevoucher/' + customerId);
    }
    getCart(customerId: string) {
        return this.apiService.get('/user/cart/' + customerId);
    }
    removeDetail(id: any) {
        return this.apiService.delete('/user/cart/detail/' + id);
    }
    checkOutCart(userId: any, body: any) {
        return this.apiService.post('/user/cart/checkout/' + userId, body);
    }
}
