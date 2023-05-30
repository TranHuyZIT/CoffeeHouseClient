import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductCategoryService } from 'src/app/core/services/productCategory.service';
import { ToppingService } from 'src/app/core/services/topping.service';
import { FileHandle } from '../../shared/dragDrop.directive';

@Component({
    selector: 'admin-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css'],
})
export class Product implements OnInit {
    @ViewChild('closeupdateform') closeUpdateForm: any;
    constructor(
        private productService: ProductService,
        private categoryService: ProductCategoryService,
        private toppingService: ToppingService,
        private toastrService: ToastrService,
        private fb: FormBuilder
    ) {
        this.updateForm = this.fb.group({
            name: ['', Validators.required],
            price: [
                0,
                [
                    Validators.required,
                    Validators.min(0),
                    Validators.pattern('^(0|[1-9][0-9]*)$'),
                ],
            ],
            description: ['', Validators.required],
            productCategoryId: [0, Validators.required],
        });
    }
    name!: string;
    modalType: string = '';
    loading = true;
    pageSize: number = 4;
    pageNo: number = 1;
    numberOfResults!: number;
    total!: number;
    sortBy: string = '';
    reverse = false;
    products: any;
    productCategoryFilterId = '';
    previewImage: any;
    updateForm!: FormGroup;
    isSubmitting = false;
    selectedId = '';
    files: FileHandle[] = [];
    categoriesOptions: any;
    toppingsOptions: any = [];
    chipToppings: any = [];
    ngOnInit(): void {
        this.getPage(1);
    }

    getPage(page: number) {
        this.loading = true;
        this.productService
            .getAll({
                pageSize: this.pageSize,
                pageNo: page,
                sortBy: this.sortBy,
                name: this.name,
                prodCategoryID: this.productCategoryFilterId,
            })
            .pipe(
                tap((res) => {
                    this.total = res.totalElements;
                    this.numberOfResults = res.numberOfElements;
                    this.pageNo = res.pageable.pageNumber + 1;
                    this.loading = false;
                })
            )
            .subscribe((response) => {
                this.products = response.content;
                this.total = response.totalElements;
                this.numberOfResults = response.content.length;
            });
    }
    getCategories() {
        this.categoryService
            .getAll()
            .subscribe((response) => (this.categoriesOptions = response));
    }
    getToppings() {
        this.toppingService.getAll().subscribe((response) => {
            this.toppingsOptions = response.content;
        });
    }

    search() {
        this.getPage(1);
    }
    edit(prod: any) {
        this.modalType = 'update';
        this.getCategories();
        this.getToppings();
        this.previewImage =
            'http://localhost:10000/api/v1/image/product/' + prod.image;

        this.updateForm.setValue({
            name: prod.name,
            price: prod.price,
            productCategoryId: prod.productCategory.id,
            description: prod.description,
        });
        this.chipToppings = prod.productToppings;
        this.selectedId = prod.id;
    }
    add() {
        this.previewImage = '';
        this.getToppings();
        this.getCategories();
        this.modalType = 'add';
        this.files = [];
        this.updateForm.reset({
            name: '',
            price: 0,
            toppingsId: [],
            description: '',
        });
    }

    refresh() {
        this.name = '';
        this.productCategoryFilterId = '';
        this.getPage(1);
        this.previewImage = '';
        this.files = [];
    }
    submitForm() {
        if (this.modalType == 'add') {
            if (this.updateForm.valid && this.files.length > 0) {
                this.productService
                    .add(this.files[0].file, {
                        ...this.updateForm.value,
                        toppingsId: this.chipToppings.map(
                            (chip: any) => chip.id
                        ),
                    })
                    .pipe(tap(console.log))
                    .subscribe((response) => {
                        if (!Object.keys(response).includes('message')) {
                            this.toastrService.success(
                                'Add product successfully'
                            );
                            this.closeUpdateForm.nativeElement.click();
                            this.refresh();
                        } else {
                            this.toastrService.error(response.message);
                        }
                    });

                return;
            }
        } else {
            if (
                this.updateForm.valid &&
                (this.files.length > 0 || this.previewImage != '')
            ) {
                this.productService
                    .update(
                        this.files[0]?.file,
                        {
                            ...this.updateForm.value,
                            toppingsId: this.chipToppings.map(
                                (chip: any) => chip.id
                            ),
                        },
                        this.selectedId
                    )
                    .pipe(tap(console.log))
                    .subscribe((response) => {
                        if (!Object.keys(response).includes('message')) {
                            this.toastrService.success(
                                'Update product successfully'
                            );
                            this.refresh();
                            this.closeUpdateForm.nativeElement.click();
                        } else {
                            this.toastrService.error(response.message);
                        }
                    });

                return;
            }
        }
        console.log('Có lỗi');
    }
    filesDropped(files: FileHandle[]) {
        this.files = files;
    }
    changeImage() {
        this.files = [];
        this.previewImage = '';
    }
    removeToppingChip(toppingId: any) {
        this.chipToppings = this.chipToppings.filter(
            (chipTopping: any) => chipTopping != toppingId
        );
    }
    addToppingChip(toppingId: any) {
        const index = this.chipToppings.findIndex(
            (chip: any) => chip.id == toppingId
        );
        if (index === -1) {
            this.chipToppings.push({
                ...this.toppingsOptions.find(
                    (topping: any) => topping.id == toppingId
                ),
            });
        }
    }
}
