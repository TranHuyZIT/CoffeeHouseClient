import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { ProductCategoryService } from 'src/app/core/services/productCategory.service';
import { FileHandle } from '../../shared/dragDrop.directive';

@Component({
    selector: 'admin-product-category',
    templateUrl: './productCategory.component.html',
    styleUrls: ['./productCategory.component.css'],
})
export class ProductCategory implements OnInit {
    @ViewChild('closeupdateform') closeUpdateForm: any;
    name: string = '';
    page = 1;
    categories: any;
    loading = true;
    updateForm!: FormGroup;
    isSubmitting!: boolean;
    files: FileHandle[] = [];
    modalType!: string;
    previewImage = '';
    constructor(
        private productCategoryService: ProductCategoryService,
        private toastrService: ToastrService,
        private fb: FormBuilder
    ) {
        this.updateForm = this.fb.group({
            name: ['', [Validators.required]],
            id: [''],
        });
    }
    ngOnInit() {
        this.loading = true;
        this.productCategoryService.getAll().subscribe((response: any) => {
            if (!Object.keys(response).includes('message')) {
                this.loading = false;
                this.categories = response;
                console.log(response);
                return;
            }
            this.categories = [];
        });
    }
    submitForm() {
        switch (this.modalType) {
            case 'add':
                if (this.updateForm.valid && this.files.length > 0) {
                    this.productCategoryService
                        .add(this.files[0].file, this.updateForm.value)
                        .subscribe((response) => {
                            if (!Object.keys(response).includes('message')) {
                                this.toastrService.success(
                                    'Add product categories successfully'
                                );
                                this.categories = response;
                                this.closeUpdateForm.nativeElement.click();
                                this.refresh();
                                return;
                            }
                            this.toastrService.error(response.message);
                        });
                    this.updateForm.reset();

                    return;
                }
                this.toastrService.error(
                    'Vui lòng kiểm tra lại thông tin nhập!'
                );
                break;

            case 'update':
                if (
                    this.updateForm.valid &&
                    (this.files.length > 0 || this.previewImage)
                ) {
                    this.productCategoryService
                        .update(this.files[0].file, this.updateForm.value)
                        .subscribe((response) => {
                            if (!Object.keys(response).includes('message')) {
                                this.toastrService.success(
                                    'Add product categories successfully'
                                );
                                this.categories = response;
                                this.closeUpdateForm.nativeElement.click();
                                this.refresh();
                                return;
                            }
                            this.toastrService.error(response.message);
                        });
                    this.updateForm.reset();
                    return;
                }
                this.toastrService.error(
                    'Vui lòng kiểm tra lại thông tin nhập!'
                );
                break;
            default:
                this.toastrService.error('Vui lòng thử lại sau!');
        }
    }
    search() {}
    refresh() {
        this.ngOnInit();
        this.name = '';
    }
    filesDropped(files: FileHandle[]): void {
        this.files = files;
    }
    edit(productCategory: any) {
        this.updateForm.setValue({
            name: productCategory.name,
            id: productCategory.id,
        });
        this.files = [];
        this.modalType = 'update';
        this.previewImage =
            'http://localhost:10000/api/v1/image/product_category/' +
            productCategory.image;
    }
    add() {
        this.files = [];
        this.modalType = 'add';
        this.updateForm.reset();
        this.previewImage = '';
    }
    changeImage() {
        this.files = [];
        this.previewImage = '';
    }
}
