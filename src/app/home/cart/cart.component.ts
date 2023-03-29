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
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';

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
        private toastrService: ToastrService
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
            this.cartService.getCart(user.id + '').subscribe((cartData) => {
                this.cart = cartData;
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
    loading = false;
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
}
