import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileHandle } from 'src/app/admin/shared/dragDrop.directive';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
    selector: 'info-component',
    templateUrl: 'info.component.html',
    styleUrls: ['info.component.css'],
})
export class InfoComponent implements OnInit {
    constructor(
        private customerService: CustomerService,
        private authService: AuthService,
        private fb: FormBuilder,
        private toastrService: ToastrService
    ) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            address: ['', Validators.required],
        });
    }
    ngOnInit(): void {
        this.submitted = false;
        this.authService.currentUser.subscribe((user: any) => {
            this.customerService.getByUserId(user.id).subscribe((customer) => {
                this.currentCustomer = customer;
                this.originImage = `http://localhost:10000/api/v1/image/customer/${customer.image}`;
                this.previewImage = this.originImage;
                this.form.setValue({
                    email: user.email,
                    name: user.name,
                    phone: user.phone,
                    address: customer.address,
                });
            });
        });
    }

    //Image
    files: FileHandle[] = [];
    originImage = '';
    previewImage = '';
    currentCustomer: any;
    filesDropped(files: FileHandle[]) {
        this.files = files;
    }
    changeImage() {
        this.files = [];
        this.previewImage = '';
    }
    cancelImage() {
        this.previewImage = this.originImage;
    }

    // Form
    form!: FormGroup;
    submitted = false;
    get formControls(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }
    save() {
        this.submitted = true;
        if (!this.form.valid) {
            this.toastrService.error('Vui lòng kiểm tra lại thông tin');
            return;
        }
        this.customerService
            .update(
                this.files[0]?.file,
                this.form.value.address,
                this.currentCustomer.id
            )
            .subscribe({
                next: (data) => {
                    this.customerService
                        .updateUser(this.currentCustomer.user.id, {
                            name: this.form.value.name,
                            phone: this.form.value.phone,
                            email: this.form.value.email,
                        })
                        .subscribe({
                            next: (data) => {
                                this.toastrService.success(
                                    'Cập nhật thông tin thành công'
                                );
                            },
                            error: (err) =>
                                this.toastrService.error(err.message),
                        });
                },
                error: (err) => this.toastrService.error(err.message),
            });
    }
}
