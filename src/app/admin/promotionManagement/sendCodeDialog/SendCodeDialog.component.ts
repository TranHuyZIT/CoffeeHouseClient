import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from 'src/app/core/services/customer.service';
import { PromotionService } from 'src/app/core/services/promotion.service';
import { debounceTime, BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CodeService } from 'src/app/core/services/code.service';

@Component({
    selector: 'send-code-dialog',
    styleUrls: ['SendCodeDialog.component.css'],
    templateUrl: 'SendCodeDialog.component.html',
})
export default class SendCodeDialog implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<SendCodeDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private voucherService: PromotionService,
        private customerService: CustomerService,
        private toastrService: ToastrService,
        private codeService: CodeService
    ) {}
    voucher: any;
    customer: any;
    customerOptions: any[] = [];
    searchTermCustomer$ = new BehaviorSubject<any>('');
    ngOnInit(): void {
        this.voucherService
            .getOne(this.data.voucherId)
            .subscribe((response) => {
                this.voucher = response;
            });
        this.customerService.getAll().subscribe((response) => {
            this.customerOptions = response.content;
        });
        this.searchTermCustomer$
            .asObservable()
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe((search) => {
                this.customerService
                    .getAll({
                        name: search,
                    })
                    .subscribe((customers) => {
                        this.customerOptions = customers.content;
                    });
            });
    }
    onCustomerChange(customerId: any) {
        this.customer = this.customerOptions.find((e) => e.id == customerId);
    }
    sendCode() {
        if (!this.customer) {
            this.toastrService.error('Vui lòng chọn khách để tặng trước');
            return;
        }
        console.log(this.customer);
        this.codeService
            .sendCodeToCustomer(this.voucher.id, {
                userId: this.customer.user.id,
            })
            .subscribe({
                next: (voucherCode) => {
                    this.toastrService.success(
                        `Đã gửi một code từ voucher ${this.voucher.name} đến ${this.customer.user.email}`
                    );
                    this.dialogRef.close();
                },
                error: (err) => {
                    this.toastrService.error(err.message);
                },
            });
    }
}
