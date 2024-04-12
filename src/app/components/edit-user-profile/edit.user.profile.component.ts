import { OrderDetail } from '../../models/model.detail';
import { OrderService } from 'src/app/service/order.serivce';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { ActivatedRoute, Router } from '@angular/router';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { TokenService } from 'src/app/service/token.service';
import { UserResponse } from 'src/app/responses/user/user.response';
import { UpdateUserDTO } from 'src/dtos/user/update.user.dto';
declare var bootstrap: any;
@Component({
    selector: 'edit-user-profile',
    templateUrl: './edit.user.profile.component.html',
    styleUrls: ['./edit.user.profile.component.scss'],
})
export class EditUserProfileComponent implements OnInit {
    userProfileForm: FormGroup;
    userResponse?: UserResponse;
    birth_date_updated: any;
    token: string = '';
    changed: boolean = false;

    isInfoVisible: boolean = false;
    isPwVisible: boolean = false;

    errorMesssage: string = '';
    isToastShown: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
        private tokenSerive: TokenService,
    ) {
        this.userProfileForm = this.formBuilder.group(
            {
                full_name: ['', Validators.minLength(6)],
                address: [''],
                old_password: [''],
                password: ['', Validators.minLength(6)],
                retype_password: [''],
                date_of_birth: [Date.now()],
            },
            {
                validators: [this.validateAreEqual, this.checkAge], // Custom validator function for password match
            },
        );
    }
    ngOnInit(): void {
        this.token = this.tokenSerive.getToken() ?? '';
        this.changed = false;
        if (this.token) {
            this.userService.getUserDetails(this.token).subscribe({
                next: (response: any) => {
                    debugger;
                    this.userResponse = {
                        ...response,
                        date_of_birth: new Date(response.date_of_birth),
                    };

                    // điền sẵn value cũ
                    this.userProfileForm.patchValue({
                        //     full_name: this.userResponse?.full_name ?? '',
                        //     address: this.userResponse?.address ?? '',
                        date_of_birth: this.userResponse?.date_of_birth
                            .toISOString()
                            .substring(0, 10),
                    });

                    // this.userService.saveUserResponseToLocalStorage(this.userResponse);
                },
                complete: () => {
                    debugger;
                },
                error: (err: any) => {
                    debugger;
                    console.error(err.error.message);
                },
            });
        }
    }

    // check retype password
    validateAreEqual: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password');
        const retype_password = control.get('retype_password');
        debugger;
        if (password?.value === retype_password?.value) {
            debugger;
            return null;
        } else {
            return { notSame: true };
        }
    };

    // kiểm tra tuổi
    checkAge(c: AbstractControl): { ageInvalid: boolean } | null {
        const today = new Date();
        const birthDate = new Date(c.value.date_of_birth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            return { ageInvalid: true };
        } else {
            return null;
        }
    }

    showNotificationAndNavigate() {
        const toastLiveExample = document.getElementById('liveToast');
        const toast = new bootstrap.Toast(toastLiveExample);
        toast.show();
        // Thêm callback function để điều hướng sau khi toast được hiển thị
        toastLiveExample!.addEventListener('hidden.bs.toast', () => {
            this.router.navigate(['/user-profile']);
        });
    }
    showNotification() {
        const toastLiveExample = document.getElementById('liveToast');
        const toast = new bootstrap.Toast(toastLiveExample);
        toast.show();
    }

    // save changed
    save(): void {
        debugger;
        if (this.userProfileForm.valid) {
            const updateUserDTO: UpdateUserDTO = {
                full_name: this.userProfileForm.get('full_name')?.value,
                address: this.userProfileForm.get('address')?.value,
                old_password: this.userProfileForm.get('old_password')?.value,
                password: this.userProfileForm.get('password')?.value,
                retype_password: this.userProfileForm.get('retype_password')?.value,
                date_of_birth: this.userProfileForm.get('date_of_birth')?.value,
            };
            this.userService
                .updateUserDetails(this.userResponse?.id!, this.token, updateUserDTO)
                .subscribe({
                    next: (response: any) => {
                        this.userService.removeUserFromLocalStorage;
                        this.tokenSerive.removeToken;
                        // this.router.navigate(['/user-profile']);
                        // this.errorMesssage = 'Đổi thông tin thành công!';
                        // this.showNotification();
                    },
                    complete: () => {
                        console.log('ok');
                        this.errorMesssage = 'Đổi thông tin thành công!';
                        this.showNotificationAndNavigate();
                    },
                    error: (error: any) => {
                        debugger;
                        console.log(`${error.error}`);
                        this.errorMesssage = error.error;
                        this.showNotification();
                    },
                });
        } else {
            this.errorMesssage = 'Thông tin không hợp lệ! Vui lòng kiểm tra lại!';
            this.showNotification();
        }
    }

    resetPwValues() {
        this.userProfileForm.patchValue({
            password: '',
            retype_password: '',
        });
    }
    resetInfoValues() {
        this.userProfileForm.patchValue({
            full_name: '',
            address: '',
            date_of_birth: this.userResponse?.date_of_birth.toISOString().substring(0, 10),
        });
    }

    changeInfoFunc(event: any) {
        this.isInfoVisible = event.target.checked;
        if (!this.isInfoVisible) {
            this.resetInfoValues();
        }
    }
    changePwFunc(event: any) {
        this.isPwVisible = event.target.checked;
        if (!this.isPwVisible) {
            this.resetPwValues();
        }
    }
}
