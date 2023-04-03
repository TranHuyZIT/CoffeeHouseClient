import { Component } from '@angular/core';
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
import { OrderConfirmComponent } from './orderConfirm/OrderConfirm.component';

@Component({
    templateUrl: 'cart.component.html',
    styleUrls: ['cart.component.css'],
    selector: 'home-cart',
})
export class CartComponent {
    constructor(
        private cartService: CartService,
        private fb: FormBuilder,
        private authService: AuthService,
        private toastrService: ToastrService,
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
        });
        this.authService.currentUser.subscribe((user) => {
            this.loading = true;
            this.cartService.getCart(user.id + '').subscribe((cartData) => {
                this.cart = cartData;
                this.customer = cartData.customer;
                this.form.get('address')?.setValue(this.customer.address);
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
    loading = true;
    submitted = false;
    form!: FormGroup;
    deleteId: any;

    get formControls(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    // table handling
    deleteRow() {
        this.cartService.removeDetail(this.deleteId).subscribe((response) => {
            if (Object.keys(response).includes('message')) {
                this.toastrService.error(response.message);
                return;
            }
            this.toastrService.success('Xóa khỏi giỏ hàng thành công');
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

    checkOutCart() {
        this.cartService
            .checkOutCart(this.customer.user.id, {
                deliveryTime: this.form.value.deliveryTime,
                address: this.form.value.address,
                note: this.form.value.note,
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
