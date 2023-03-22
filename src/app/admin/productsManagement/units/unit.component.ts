import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UnitService } from 'src/app/core/services/unit.service';

@Component({
    templateUrl: './unit.component.html',
    styleUrls: ['./unit.component.css'],
    selector: 'admin-unit',
})
export class UnitComponent implements OnInit {
    @ViewChild('closemodalbutton') closeEditModalBtn: any;
    name = '';
    loading = true;
    unitsPaginated: any;
    pageSize = 5;
    total = 0;
    selectedDelete: any;
    selectedUpdate: any;
    numberOfResults = 0;
    page = 1;
    updateForm!: FormGroup;
    isSubmitting = false;
    modalType!: string;
    constructor(
        private unitService: UnitService,
        private toasrtService: ToastrService,
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
        });
    }
    ngOnInit(): void {
        this.loading = true;
        this.unitService.getAll().subscribe((response) => {
            this.loading = false;
            if (!Object.keys(response).includes('message')) {
                this.unitsPaginated = response;
                this.total = response.length;
            } else {
                this.toasrtService.error(response.message);
            }
        });
    }
    handleAdd() {
        this.modalType = 'add';
    }
    handleEdit(unit: any) {
        this.modalType = 'update';
        this.updateForm.setValue({
            name: unit.name,
            price: unit.price,
        });
        this.selectedUpdate = unit;
    }
    setSelectedDelete(unit: any) {
        this.selectedDelete = unit;
    }
    refresh() {
        this.ngOnInit();
    }
    submitForm() {
        switch (this.modalType) {
            case 'add':
                if (this.updateForm.valid && !this.isSubmitting) {
                    this.unitService
                        .add(this.updateForm.value)
                        .subscribe((response) => {
                            if (!Object.keys(response).includes('message')) {
                                this.unitsPaginated = response;
                                this.total = response.length;
                                this.toasrtService.success(
                                    'Thêm đơn vị mới thành công'
                                );
                                this.closeEditModalBtn.nativeElement.click();
                                this.refresh();
                            } else {
                                this.toasrtService.error(response.message);
                            }
                        });
                    return;
                }
                this.toasrtService.error(
                    'Vui lòng kiểm tra lại thông tin nhập'
                );
                break;
            case 'update':
                if (this.updateForm.valid && !this.isSubmitting) {
                    this.unitService
                        .update(this.selectedUpdate.id, this.updateForm.value)
                        .subscribe((response) => {
                            if (!Object.keys(response).includes('message')) {
                                this.unitsPaginated = response;
                                this.total = response.length;
                                this.toasrtService.success(
                                    'Cập nhật đơn vị mới thành công'
                                );
                                this.closeEditModalBtn.nativeElement.click();
                                this.refresh();
                            } else {
                                this.toasrtService.error(response.message);
                            }
                        });
                    return;
                }
                this.toasrtService.error(
                    'Vui lòng kiểm tra lại thông tin nhập'
                );
                break;
        }
    }
}
