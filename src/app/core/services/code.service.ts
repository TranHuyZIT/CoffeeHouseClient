import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class CodeService {
    constructor(private apiService: ApiService) {}
    generateCode(body: any) {
        return this.apiService.post('/admin/code/generate', body);
    }
    sendCodeToCustomer(voucherId: any, param: any) {
        return this.apiService.post('/admin/code/' + voucherId, param);
    }
}
