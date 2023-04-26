import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()
export class AccountService {
    constructor(private apiService: ApiService) {}
    getAllAccounts(
        name: string,
        pageNo?: number,
        pageSize?: number,
        sortBy?: string,
        reverse?: boolean
    ) {
        const params = new HttpParams()
            .set('pageNo', pageNo || '')
            .set('name', name || '')
            .set('sortBy', sortBy || '')
            .set('pageSize', pageSize || '')
            .set('reverse', !!reverse);
        return this.apiService.get('/admin/account', params);
    }
    updateAccount(id: number, newAccount: any) {
        return this.apiService.put(`/admin/account/${id}`, newAccount);
    }
    deleteAccount(id: number) {
        return this.apiService.delete(`/admin/account/${id}`);
    }
}
