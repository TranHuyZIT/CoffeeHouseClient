import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class UnitService {
    constructor(private apiService: ApiService) {}
    getAll() {
        return this.apiService.get('/unit');
    }
    update(id: any, body: any) {
        return this.apiService.put(`/admin/unit/${id}`, body);
    }
    add(body: any) {
        return this.apiService.post('/admin/unit', body);
    }
}
