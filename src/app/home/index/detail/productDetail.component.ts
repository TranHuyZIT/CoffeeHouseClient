import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private cartService: CartService
    ) {}

    ngOnInit(): void {
        this.slug = this.route.snapshot.paramMap.get('slug');
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
    amount: number = 0;
    sum = 0;
    selectedSizeId: any;
    toppingIds: any[] = [];
    setAmount(newAmount: number) {
        this.amount = newAmount > 0 ? newAmount : 0;
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
    addDetail() {}
}
