import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ToppingService } from 'src/app/core/services/topping.service';

@Component({
    selector: 'admin-topping',
    templateUrl: './topping.component.html',
    styleUrls: ['./topping.component.css'],
})
export class ToppingComponent implements OnInit {
    @ViewChild('closemodalbutton') closeModalButton: any;
    @ViewChild('closedeletemodal') closeDeleteModal: any;
    constructor(
        private toppingService: ToppingService,
        private fb: FormBuilder,
        private toastrService: ToastrService
    ) {
        this.updateForm = fb.group({
            name: ['', Validators.required],
            price: [
                0,
                [
                    Validators.required,
                    Validators.min(0),
                    Validators.pattern('^(0|[1-9][0-9]*)$'),
                ],
            ],
        });
    }
    name!: string;
    loading = true;
    sortBy: string = 'id';
    reverse = false;
    pageSize: number = 5;
    pageNo!: number;
    total!: number;
    numberOfResults = 0;
    toppingsPaginated: any;
    updateForm!: FormGroup;
    modalType = '';
    isSubmitting = false;
    selectedId: any;
    selectedDelete: any;
    ngOnInit(): void {
        this.getPage(1);
    }
    refresh() {
        this.name = '';
        this.getPage(1);
    }
    getPage(page: number) {
        this.toppingService
            .getAll({
                pageSize: this.pageSize,
                pageNo: page,
                sortBy: this.sortBy,
                name: this.name,
                reverse: this.reverse,
            })
            .subscribe((response) => {
                if (!Object.keys(response).includes('message')) {
                    this.toppingsPaginated = response.content;
                    this.total = response.totalElements;
                    this.numberOfResults = response.numberOfElements;
                    this.pageNo = response.pageable.pageNumber + 1;
                    this.loading = false;
                }
            });
    }
    setSortBy(sortBy: string) {
        if (this.sortBy === sortBy) {
            this.reverse = !this.reverse;
        }

        this.sortBy = sortBy;
        this.getPage(1);
    }
    handleEdit(topping: any) {
        this.modalType = 'update';
        this.selectedId = topping.id;
        this.updateForm.setValue({
            name: topping.name,
            price: topping.price,
        });
    }
    handleAdd() {
        this.modalType = 'add';
    }
    deleteTopping() {
        this.toppingService
            .delete(this.selectedDelete.id)
            .subscribe((response) => {
                if (!Object.keys(response).includes('message')) {
                    this.toastrService.success('Xóa thành công');
                    this.closeDeleteModal.nativeElement.click();
                } else {
                    this.toastrService.error(response.message);
                    this.closeDeleteModal.nativeElement.click();
                }
            });
    }
    setSelectedDelete(topping: any) {
        this.selectedDelete = topping;
    }
    submitForm() {
        switch (this.modalType) {
            case 'add':
                if (this.updateForm.valid) {
                    this.toppingService
                        .add(this.updateForm.value)
                        .subscribe((response) => {
                            if (!Object.keys(response).includes('message')) {
                                this.toastrService.success(
                                    'Thêm topping mới thành công'
                                );
                                this.closeModalButton.nativeElement.click();
                                this.updateForm.reset();
                            } else {
                                this.toastrService.error(response.message);
                            }
                        });
                    return;
                }
                this.toastrService.error('Có lỗi xảy ra, vui lòng thử lại sau');
                break;
            case 'update':
                console.log(this.updateForm.value);

                if (this.updateForm.valid) {
                    this.toppingService
                        .update(this.selectedId, this.updateForm.value)
                        .subscribe((response) => {
                            if (!Object.keys(response).includes('message')) {
                                this.toastrService.success(
                                    'Update topping thành công'
                                );
                                this.closeModalButton.nativeElement.click();
                                this.updateForm.reset();
                            } else {
                                this.toastrService.error(response.message);
                            }
                        });
                    return;
                }
                this.toastrService.error('Có lỗi xảy ra, vui lòng thử lại sau');
                break;
        }
    }
}
