import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO } from 'src/dtos/user/login.dto';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    @ViewChild('loginForm') registerForm!: NgForm;
    // declare variables tương ứng với các fields trong form.
    phone: string;
    password: string;
    role_id: number;

    constructor(private router: Router, private userService: UserService) {
        this.phone = '123456';
        this.password = '112233';
        this.role_id = 1;
    }
    onPhoneChange() {
        console.log(`Phone typed: ${this.phone}`);
    }
    login() {
        const message = `phone: ${this.phone}` + `password: ${this.password}`;
        debugger;
        // alert(message);
        const loginDTO: LoginDTO = {
            phone_number: this.phone,
            password: this.password,
            role_id: 1,
        };

        this.userService.login(loginDTO).subscribe({
            next: (response: any) => {
                debugger;
                // Xử lý kết quả trả về khi register success
                // this.router.navigate(['/login']);
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
}
