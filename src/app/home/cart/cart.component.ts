import { Component, OnInit, ViewChild } from '@angular/core';
import {
    AbstractControl,
    Form,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { PromotionService } from 'src/app/core/services/promotion.service';
import { OrderConfirmComponent } from './orderConfirm/OrderConfirm.component';

@Component({
    templateUrl: 'cart.component.html',
    styleUrls: ['cart.component.css'],
    selector: 'home-cart',
})
export class CartComponent implements OnInit {
    @ViewChild('closemodaldelete') closeDeleteButton: any;
    almostValidVouchers: any;
    constructor(
        private cartService: CartService,
        private fb: FormBuilder,
        private authService: AuthService,
        private toastrService: ToastrService,
        private voucherService: PromotionService,
        private dialog: MatDialog,
        private router: Router
    ) {
        this.form = this.fb.group({
            address: ['', Validators.required],
            note: [''],
            deliveryTime: [
                '',
                [Validators.required, this.dateGreaterThanTodayValidator()],
            ],
            voucherId: [''],
        });
    }
    ngOnInit(): void {
        this.authService.currentUser.subscribe((user) => {
            if (!user) return;
            this.loading = true;
            this.voucherService.getValidVoucherForCart(user.id).subscribe({
                next: (response) => {
                    this.validVouchers = response.valid;
                    this.almostValidVouchers = response.almostValid;
                    this.generateDescriptionVoucher();
                },
                error: (err) => {
                    this.toastrService.error(err.message);
                },
            });
            this.cartService.getCart(user.id + '').subscribe((cartData) => {
                this.cart = cartData;
                if (cartData.voucher) {
                    this.cart.voucher.descProd = cartData.voucher.products.map(
                        (e: any, index: number) => {
                            if (index == cartData.voucher.products.length - 1)
                                return e.name;
                            return `${e.name}, `;
                        }
                    );
                }
                this.customer = cartData.customer;
                this.form.get('address')?.setValue(this.customer.address);
                this.form
                    .get('voucherId')
                    ?.setValue(cartData?.voucher?.id || '');
                this.loading = false;
            });
        });
    }
    // date
    dateGreaterThanTodayValidator(): ValidationErrors | null {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const currentDate = new Date();
            const inputDate = new Date(control.value);

            if (inputDate <= currentDate) {
                return { dateGreaterThanToday: true };
            }

            return null;
        };
    }

    // Data and Form
    cart: any;
    customer: any;
    validVouchers: any;
    loading = true;
    submitted = false;
    form!: FormGroup;
    deleteId: any;
    selectedVoucher: any;

    get formControls(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }
    get formValues() {
        return this.form.value;
    }
    generateDescriptionVoucher() {
        this.validVouchers = this.validVouchers?.map((ele: any) => {
            const productsName = ele.products.map((e: any, index: number) => {
                if (index == ele.products.length - 1) return e.name;
                return `${e.name}, `;
            });
            return {
                ...ele,
                descProd: productsName,
            };
        });
        this.almostValidVouchers = this.almostValidVouchers?.map((ele: any) => {
            const productsName = ele.products.map((e: any, index: number) => {
                if (index == ele.products.length - 1) return e.name;
                return `${e.name}, `;
            });
            return {
                ...ele,
                descProd: productsName,
            };
        });
    }

    // table handling
    deleteRow() {
        this.closeDeleteButton.nativeElement.click();
        this.cartService.removeDetail(this.deleteId).subscribe((response) => {
            if (Object.keys(response).includes('message')) {
                this.toastrService.error(response.message);
                return;
            }
            this.toastrService.success('Xóa khỏi giỏ hàng thành công');
            this.ngOnInit();
        });
    }
    setDelete(id: any) {
        this.deleteId = id;
    }
    confirm() {
        this.submitted = true;
        if (!this.form.valid) {
            this.toastrService.error('Vui lòng kiểm tra lại thông tin');
            return;
        }
        this.dialog.open(OrderConfirmComponent, {
            data: {
                ...this.form.value,
                checkOutCart: () => this.checkOutCart(),
            },
        });
    }

    selectVoucher(voucherId: any) {
        if (voucherId == '0' || !voucherId) return;
        this.selectedVoucher = this.validVouchers.find(
            (e: any) => e.id == voucherId
        );
        let total = 0;
        let discount = 0;
        for (let detail of this.cart.details) {
            if (
                this.selectedVoucher.products.find(
                    (e: any) => e.id === detail.product.id
                )
            ) {
                discount += Math.min(
                    detail.tongtien * this.selectedVoucher.percentage,
                    this.selectedVoucher.maxDiscount
                );
            }
            total += detail.tongtien;
        }
        this.cart.tongtien = total - discount;
        this.cart.discount = discount;
    }
    removeVoucher() {
        this.selectedVoucher = null;
        this.ngOnInit();
    }

    checkOutCart() {
        this.cartService
            .checkOutCart(this.customer.user.id, {
                deliveryTime: this.form.value.deliveryTime,
                address: this.form.value.address,
                note: this.form.value.note,
                voucherId: this.selectedVoucher?.id,
            })
            .subscribe({
                next: (response) => {
                    // response is an order
                    this.toastrService.success(
                        'Đặt hàng thành công, đơn hàng của bạn đang được xử lý'
                    );
                    this.submitted = false;
                    this.router.navigateByUrl('/home');
                },
                error: (err) => {
                    this.toastrService.error(err.message);
                },
            });
    }
}
