import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject, tap } from 'rxjs';
import { CustomerService } from 'src/app/core/services/customer.service';
import { OrderService } from 'src/app/core/services/order.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ToppingService } from 'src/app/core/services/topping.service';
import { UnitService } from 'src/app/core/services/unit.service';

@Component({
    templateUrl: './detail.component.html',
    selector: 'detail-order',
    styleUrls: ['./detail.component.css'],
})
export class DetailOrderComponent implements OnInit {
    searchTermProduct$ = new Subject<string>();
    searchTermTopping$ = new Subject<string>();
    searchTermCustomer$ = new Subject<string>();
    unitOptions: any;
    toppingOptions: any;
    constructor(
        private fb: FormBuilder,
        private orderService: OrderService,
        private customerService: CustomerService,
        private productService: ProductService,
        private unitService: UnitService,
        private toppingService: ToppingService,
        private activatedRoute: ActivatedRoute,
        private route: Router,
        private toastrService: ToastrService
    ) {
        this.updateForm = this.fb.group({
            address: ['', Validators.required],
            deliveryTime: ['', Validators.required],
            note: '',
            voucherId: '',
            customerId: ['', Validators.required],
        });
    }
    ngOnInit(): void {
        this.getSlug();
        this.getProductOptions();
        this.getUnitOptions();
        this.getToppingOptions();
        this.getCustomer();
        this.searchTermProduct$.pipe(debounceTime(500)).subscribe((search) => {
            this.getProductOptions(search);
        });
        this.searchTermTopping$.pipe(debounceTime(500)).subscribe((search) => {
            this.getToppingOptions(search);
        });
        this.searchTermCustomer$.pipe(debounceTime(500)).subscribe((search) => {
            this.getCustomer(search);
        });
    }
    getSlug() {
        this.activatedRoute.paramMap.subscribe((params) => {
            this.orderIdSlug = +(params.get('slug') || '0');
            this.getFullOrder();
        });
    }
    getProductOptions(name?: any) {
        this.productService.getAll({ name }).subscribe((response) => {
            if (Object.keys(response).includes('message')) {
                this.toastrService.error(response.message);
                return;
            }
            this.productOptions = response.content;
        });
    }
    getCustomer(name?: any) {
        this.customerService.getAll({ name }).subscribe((response) => {
            if (Object.keys(response).includes('message')) {
                this.toastrService.error(response.message);
                return;
            }
            this.customerOptions = response.content;
        });
    }
    getUnitOptions() {
        this.unitService.getAll().subscribe((response) => {
            if (Object.keys(response).includes('message')) {
                this.toastrService.error(response.message);
                return;
            }
            this.unitOptions = response;
        });
    }
    getToppingOptions(name?: any, productId?: any) {
        this.toppingService
            .getAll({
                productId,
                name,
            })
            .subscribe((response) => {
                if (Object.keys(response).includes('message')) {
                    this.toastrService.error(response.message);
                    return;
                }
                this.toppingOptions = response.content;
            });
    }

    getFullOrder() {
        this.orderService
            .getFullOrder(this.orderIdSlug)
            .subscribe((response) => {
                console.log(response);

                if (Object.keys(response).includes('message')) {
                    this.toastrService.error(response.message);
                    this.route.navigate(['admin/order-mgmt']);
                    return;
                }
                this.fullOrder = response;
                this.loading = false;
                this.updateForm.setValue({
                    address: response.address,
                    deliveryTime: response.deliveryTime,
                    note: response.note,
                    voucherId: response?.voucher?.id || '',
                    customerId: response?.customer?.id || '',
                });
                console.log(this.updateForm.value);

                this.details = response.details.map((detail: any) => ({
                    product: {
                        id: detail.product.id,
                        name: detail.product.name,
                        price: detail.product.price,
                    },
                    toppings: detail.toppings,
                    unit: {
                        id: detail.unit.id,
                        name: detail.unit.name,
                        price: detail.unit.price,
                    },
                }));
            });
    }
    updateForm!: FormGroup;
    orderIdSlug!: number;
    fullOrder: any;
    productOptions: any;
    customerOptions: any;
    loading = true;
    details: any;
    editIndex: number = -1;
    editingDetail: any;
    productSearch = '';
    filterProduct(search: any) {
        this.searchTermProduct$.next(search);
    }
    filterTopping(search: any) {
        this.searchTermTopping$.next(search);
    }
    removeToppingChip(toppingdId: number) {
        this.editingDetail.toppings = this.editingDetail.toppings.filter(
            (ele: any) => ele.id != toppingdId
        );
    }
    handleEditDetail(index: number, detail: any) {
        this.editIndex = index;
        this.editingDetail = { ...detail };
    }
    addToppingChip(topppingId: number) {
        const toppingInfo = this.toppingOptions.find(
            (ele: any) => ele.id == topppingId
        );
        if (
            this.editingDetail.toppings.find((ele: any) => ele.id == topppingId)
        )
            return;
        this.editingDetail.toppings.push(toppingInfo);
    }
    onUnitChange(unitId: number) {
        this.editingDetail.unit = this.unitOptions.find(
            (ele: any) => ele.id == unitId
        );
    }
    onProductChange(productId: number) {
        this.editingDetail.product = this.productOptions.find(
            (ele: any) => ele.id == productId
        );
        this.editingDetail.toppings = [];
        this.toppingOptions = [];
        this.getToppingOptions('', productId);
    }
    onCustomerChange(customerId: number) {
        const selected = this.customerOptions.find(
            (ele: any) => ele.id == customerId
        );

        this.updateForm.controls['address'].setValue(selected.address);
    }
    addRow() {
        this.cancelRow();
        this.details.push({
            product: {
                id: '',
                name: '',
                price: 0,
            },
            toppings: [],
            unit: {
                id: '',
                name: '',
                price: 0,
            },
        });
        this.handleEditDetail(
            this.details.length - 1,
            this.details[this.details.length - 1]
        );
    }
    deleteRow(index: number) {
        this.details.splice(index, 1);
    }
    saveRow() {
        this.details[this.editIndex] = { ...this.editingDetail };
        this.cancelRow();
    }
    cancelRow() {
        this.editIndex = -1;
        this.editingDetail = {};
    }
    goBack() {
        window.history.back();
    }

    submitForm() {
        if (this.updateForm.valid) {
            console.log(this.updateForm.value);
            console.log(this.details);
            this.orderService
                .updateOrder(this.orderIdSlug, {
                    ...this.updateForm.value,
                    details: this.details.map((ele: any) => ({
                        productId: ele.product.id,
                        unitId: ele.unit.id,
                        toppingIds: ele.toppings.map(
                            (topping: any) => topping.id
                        ),
                    })),
                })
                .subscribe((response) => {
                    if (Object.keys(response).includes('message')) {
                        this.toastrService.error(response.message);
                        return;
                    }
                    this.toastrService.success('Update successfully');
                    this.goBack();
                });
            return;
        }
        this.toastrService.error('Vui lòng kiểm tra lại thông tin đơn hàng');
    }
}
