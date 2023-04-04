import { Component, Inject, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { PromotionService } from 'src/app/core/services/promotion.service';

@Component({
    selector: 'promotion-detail',
    templateUrl: 'promotionDetail.component.html',
    styleUrls: ['promotionDetail.component.css'],
})
export class PromotionDetailComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<PromotionDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private productService: ProductService,
        private voucherService: PromotionService,
        private toastrService: ToastrService
    ) {
        this.form = this.fb.group({
            percentage: new FormControl('', [
                Validators.required,
                Validators.max(100),
                Validators.min(0),
            ]),
            limitNumber: new FormControl('', [
                Validators.required,
                Validators.min(0),
            ]),
            startDate: new FormControl('', Validators.required),
            endDate: new FormControl('', Validators.required),
            maxDiscount: new FormControl('', Validators.required),
            minOrderTotal: new FormControl('', Validators.required),
            name: new FormControl('', Validators.required),
        });
    }
    ngOnInit(): void {
        this.getProductOptions();
        this.productSearchTerm$.pipe(debounceTime(500)).subscribe((search) => {
            this.getProductOptions(search);
        });
        if (this.data.id) {
            this.getVoucher(this.data.id);
        }
    }
    // get voucher info for view and edit
    getVoucher(id: any) {
        this.voucherService.getOne(id).subscribe({
            next: (response) => {
                this.form.setValue({
                    percentage: response.percentage,
                    name: response.name,
                    limitNumber: response.limitNumber,
                    startDate: new Date(response.startDate),
                    endDate: new Date(response.endDate),
                    maxDiscount: response.maxDiscount,
                    minOrderTotal: response.minOrderTotal,
                });
                this.productsForTable = response.products;
            },
            error: (err) => {
                this.toastrService.error(err.message);
            },
        });
    }

    // products and filter
    getProductOptions(search?: string) {
        this.productService
            .getAll({
                name: search,
            })
            .subscribe((response) => {
                if (!Object.keys(response).includes('message')) {
                    this.productOptions = response.content;
                }
            });
    }
    productOptions: any[] = [];
    productSearchTerm$ = new Subject<string>();
    selectedProduct: any = '';
    productsForTable: any[] = [];
    onProductChange(productId: any) {
        const selected = this.productOptions.find((e) => e.id === productId);
        this.productsForTable.push(selected);
    }
    filterProduct(productId: any) {
        this.productSearchTerm$.next(productId);
    }
    // form and data
    form!: FormGroup;
    submitted = false;
    isFloat(control: AbstractControl<any, any>): ValidationErrors | null {
        const regex = /[-+][0-9]+\.[0-9]+$/;
        if (!regex.test(control.value)) {
            console.log('error float');
            return { isFloat: true };
        }
        return null;
    }
    get formControls() {
        return this.form.controls;
    }
    submit() {
        this.submitted = true;
        if (!this.form.valid) {
            this.toastrService.error('Vui lòng kiểm tra lại thông tin');
            return;
        }
        if (this.data.type === 'add') {
            this.voucherService
                .add({
                    ...this.form.value,
                    percentage: this.form.value.percentage / 100,
                    productsId: this.productsForTable.map((e) => e.id),
                })
                .subscribe({
                    next: (response) => {
                        this.toastrService.success(
                            'Tạo voucher mới thành công'
                        );
                        this.dialogRef.close();
                    },
                    error: (err) => {
                        this.toastrService.error(err.message);
                    },
                });
        } else if (this.data.type == 'update') {
            this.voucherService
                .update(this.data.id, {
                    ...this.form.value,
                    percentage: this.form.value.percentage / 100,
                    productsId: this.productsForTable.map((e) => e.id),
                })
                .subscribe({
                    next: (response) => {
                        this.toastrService.success(
                            'Tạo voucher mới thành công'
                        );
                        this.dialogRef.close();
                    },
                    error: (err) => {
                        this.toastrService.error(err.message);
                    },
                });
        }
    }
}
