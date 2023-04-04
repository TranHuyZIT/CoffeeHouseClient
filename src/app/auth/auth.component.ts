import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
    AbstractControl,
    ValidatorFn,
    ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Gender from '../enum/gender.enum';
import { Errors } from '../interfaces/error.interface';
import { AuthService } from '../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-auth-page',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
    authType: string = '';
    title: string = '';
    errors: Errors = { errors: {} };
    isSubmitting = false;
    authForm: FormGroup;
    Gender = Gender;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private fb: FormBuilder,
        private toastrService: ToastrService
    ) {
        // use FormBuilder to create a form group
        this.authForm = this.fb.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
        });

        this.authForm.addValidators([
            this.MatchValidator('password', 'repassword'),
        ]);
    }

    ngOnInit() {
        this.route.url.subscribe((data) => {
            this.authType = data[data.length - 1].path;
            this.title = this.authType === 'login' ? 'Đăng Nhập' : 'Đăng Ký';
            if (this.authType === 'register') {
                this.authForm.addControl('repassword', new FormControl());
                this.authForm.addControl(
                    'email',
                    new FormControl('', [Validators.email, Validators.required])
                );
                this.authForm.addControl(
                    'gender',
                    new FormControl('MALE', [Validators.required])
                );
                this.authForm.addControl(
                    'phone',
                    new FormControl('', [
                        Validators.required,
                        this.vietNamPhoneValidate,
                    ])
                );
            }
        });
    }

    submitForm() {
        if (this.authForm.valid) {
            const that = this;
            this.isSubmitting = true;
            this.errors = { errors: {} };
            delete this.authForm.value.repassword;
            const credentials = this.authForm.value;

            this.authService.attemptAuth(this.authType, credentials).subscribe({
                next(data) {
                    if (data.role === 'ADMIN') {
                        that.router.navigateByUrl('/admin/order-mgmt');
                        return;
                    }

                    that.router.navigateByUrl('/');
                },
                error(err) {
                    that.errors = err;
                    console.log(err);

                    that.toastrService.error(err.message);
                    that.isSubmitting = false;
                    if (that.authType === 'login') that.authForm.reset();
                },
            });
        }
    }
    MatchValidator(source: string, target: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const sourceCtrl = control.get(source);
            const targetCtrl = control.get(target);

            return sourceCtrl &&
                targetCtrl &&
                sourceCtrl.value !== targetCtrl.value
                ? { mismatch: true }
                : null;
        };
    }
    vietNamPhoneValidate(control: AbstractControl): ValidationErrors | null {
        return !/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(control.value)
            ? { phone: true }
            : null;
    }

    passwordMatchError() {
        if (this.authForm.getError('mismatch')) {
            this.authForm.controls['repassword'].setErrors({
                notMatched: true,
            });
        }
    }

    get getEmailErrorMSG() {
        if (this.authForm.controls['email'].getError('required'))
            return 'Email không được trống';
        return 'Email không hợp lệ';
    }
}
