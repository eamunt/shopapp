import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { RegisterDTO } from 'src/dtos/user/register.dto';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    @ViewChild('registerForm') registerForm!: NgForm;
    // declare variables tương ứng với các fields trong form.
    phone: string;
    password: string;
    retypePassword: string;
    fullName: string;
    address: string;
    isAccepted: boolean;
    dateOfBirth: Date;

    constructor(private router: Router, private userService: UserService) {
        this.phone = '123456';
        this.password = '112233';
        this.retypePassword = '112233';
        this.fullName = 'haotest';
        this.address = 'angular';
        this.isAccepted = true;
        this.dateOfBirth = new Date();
        this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
    }
    onPhoneChange() {
        console.log(`Phone typed: ${this.phone}`);
    }

    register() {
        debugger;
        const message =
            `phone: ${this.phone}` +
            `password: ${this.password}` +
            `retype password: ${this.retypePassword}` +
            `full name: ${this.fullName}` +
            `address: ${this.address}` +
            `is accepted: ${this.isAccepted}` +
            `dateOfBirth: ${this.dateOfBirth}`;
        // alert(message);
        const registerDTO: RegisterDTO = {
            fullname: this.fullName,
            phone_number: this.phone,
            address: this.address,
            password: this.password,
            retype_password: this.retypePassword,
            date_of_birth: this.dateOfBirth,
            facebook_account_id: 0,
            google_account_id: 0,
            role_id: 1,
        };

        this.userService.register(registerDTO).subscribe({
            next: (response: any) => {
                debugger;
                // Xử lý kết quả trả về khi register success
                this.router.navigate(['/login']);
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                // handle error if any
                alert(`Cannot register, error: ${error.error}`);
            },
        });
    }

    // check password matched ?
    checkPasswordsMatch() {
        if (this.password !== this.retypePassword) {
            this.registerForm.form.controls['retypePassword'].setErrors({ passwordMismatch: true });
        } else {
            this.registerForm.form.controls['retypePassword'].setErrors(null);
        }
    }
    checkAge() {
        if (this.dateOfBirth) {
            const today = new Date();
            const birthDate = new Date(this.dateOfBirth);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 18) {
                this.registerForm.form.controls['dateOfBirth'].setErrors({ invalidAge: true });
            } else {
                this.registerForm.form.controls['dateOfBirth'].setErrors(null);
            }
        }
    }
    onChangeCheckbox(event: any) {
        this.isAccepted = event.target.checked;
    }
}
