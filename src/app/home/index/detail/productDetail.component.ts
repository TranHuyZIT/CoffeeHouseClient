import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { UnitService } from 'src/app/core/services/unit.service';

@Component({
    templateUrl: 'productDetail.component.html',
    selector: 'product-detail',
    styleUrls: ['productDetail.component.css'],
})
export class ProductDetailComponent implements OnInit {
    slug: string | null = null;
    product: any;
    sizeOptions: any;
    loading = true;
    constructor(
        private productService: ProductService,
        private unitService: UnitService,
        private activatedRoute: ActivatedRoute,
        private route: Router,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private cartService: CartService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.slug = this.activatedRoute.snapshot.paramMap.get('slug');
        this.productService.getOne(this.slug || '').subscribe((response) => {
            this.product = response;
            this.loading = false;
            this.sum += this.product.price;
        });
        this.unitService.getAll().subscribe((response) => {
            this.sizeOptions = response;
        });
    }

    // Form data
    amount: number = 1;
    sum = 0;
    selectedSizeId: any;
    toppingIds: any[] = [];
    note: string = '';
    setAmount(newAmount: number) {
        this.amount = newAmount > 1 ? newAmount : 1;
    }
    onSelectSize(event: any) {
        this.selectedSizeId = event.value;
    }
    addTopping(topping: any) {
        this.toppingIds.push(topping.id);
        this.toastrService.success('Thêm topping thành công');
    }
    removeTopping(topping: any) {
        this.toppingIds = this.toppingIds.filter((e) => e != topping.id);
        this.toastrService.info('Xóa topping thành công');
    }
    addDetail() {
        if (!this.selectedSizeId) {
            this.toastrService.error('Vui lòng chọn size');
            return;
        }
        this.authService.currentCustomer.subscribe((customer) => {
            this.cartService
                .addDetail({
                    productId: this.product.id,
                    unitId: this.selectedSizeId,
                    customerId: customer.id,
                    toppingIds: this.toppingIds,
                    note: this.note,
                    soluong: this.amount,
                })
                .subscribe((response) => {
                    if (Object.keys(response).includes('message')) {
                        this.toastrService.error(response.message);
                        return;
                    }
                    this.toastrService.success('Thêm vào giỏ hàng thành công');
                    this.route.navigateByUrl('/home');
                });
        });
    }
}
