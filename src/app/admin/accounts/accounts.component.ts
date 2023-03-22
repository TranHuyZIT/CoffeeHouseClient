import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { tap, delay } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import Gender from 'src/app/enum/gender.enum';
import UserRole from 'src/app/enum/user-role.enum';

@Component({
    selector: 'admin-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: [
        './accounts.component.css',
        '../shared/layout/header.component.css',
    ],
})
export class AccountComponent implements OnInit {
    @ViewChild('closebuttonedit') closeButtonEdit: any;
    @ViewChild('closebuttondelete') closeButtonDelete: any;
    name: string = '';
    loading = true;
    pageNo = 1;
    pageSize = 5;
    total: number = 0;
    numberOfResults = 0;
    usersPaginated: any = [];
    updateForm: FormGroup;
    isSubmitting = false;
    Gender = Gender;
    UserRole = UserRole;
    selectedDelete: any;
    reverse!: boolean;
    sortBy: string = 'id';
    constructor(
        private accountService: AccountService,
        private toastrService: ToastrService,
        private fb: FormBuilder
    ) {
        this.updateForm = this.fb.group({
            email: ['', Validators.email],
            name: ['', Validators.required],
            gender: [Gender.Nam, Validators.required],
            role: [UserRole.USER, Validators.required],
            phone: ['', Validators.required],
            id: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.getPage(1);
    }
    getPage(page: number) {
        this.loading = true;
        this.accountService
            .getAllAccounts(
                this.name,
                page,
                this.pageSize,
                this.sortBy,
                this.reverse
            )
            .pipe(
                tap((res) => {
                    this.total = res.totalElements;
                    this.numberOfResults = res.numberOfElements;
                    this.pageNo = res.pageable.pageNumber + 1;
                    this.loading = false;
                })
            )
            .subscribe((response) => {
                this.usersPaginated = response.content;
            });
    }
    submitForm() {
        this.closeButtonEdit.nativeElement.click();
        if (this.updateForm.valid) {
            const id = this.updateForm.value.id;
            if (!id) {
                this.toastrService.error(
                    'Không thể cập nhật tài khoản với id này'
                );
                return;
            }
            const newAccount = this.updateForm.value;
            delete newAccount.id;
            this.accountService
                .updateAccount(id, newAccount)
                .subscribe((response) => {
                    // Success response
                    if (!Object.keys(response).includes('message')) {
                        this.toastrService.success('Updated successfully');
                        this.refresh();
                    }
                    this.updateForm.reset();
                });
        }
    }
    deleteAccount() {
        this.closeButtonDelete.nativeElement.click();
        if (!this.selectedDelete) {
            this.toastrService.error('Please choose an account to delete.');
            return;
        }
        this.accountService
            .deleteAccount(this.selectedDelete.id)
            .subscribe((response) => {
                // Success response
                if (!Object.keys(response).includes('message')) {
                    this.toastrService.success('Deleted successfully');
                    this.refresh();
                }
                this.selectedDelete = null;
            });
    }
    handleEditAccount(user: any) {
        this.updateForm.setValue({
            email: user.email,
            name: user.name,
            gender: user.gender,
            role: user.role,
            phone: user.phone,
            id: user.id,
        });
    }
    refresh() {
        this.name = '';
        this.ngOnInit();
    }
    setSelectedDelete(user: any) {
        this.selectedDelete = user;
    }
    serSortBy(sortBy: string) {
        if (this.sortBy === sortBy) {
            this.reverse = !this.reverse;
        }

        this.sortBy = sortBy;
        this.ngOnInit();
    }
}
