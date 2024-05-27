import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { LoginResponse } from 'src/app/responses/user/login.response';
import { RoleService } from 'src/app/service/role.service';
import { TokenService } from 'src/app/service/token.service';
import { LoginDTO } from 'src/app/dtos/user/login.dto';
import { UserService } from '../../service/user.service';
import { UserResponse } from 'src/app/responses/user/user.response';
declare var bootstrap: any;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    @ViewChild('loginForm') registerForm!: NgForm;
    // declare variables tương ứng với các fields trong form.
    phone: string;
    password: string;

    roles: Role[];
    rememberMe: boolean;
    selectedRole: Role | undefined;
    userResponse?: UserResponse;

    errorMesssage: string = '';
    isToastShown: boolean = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private tokenService: TokenService,
        private roleService: RoleService,
    ) {
        this.phone = '439900';
        this.password = '12345678';
        this.roles = [];
        this.rememberMe = false;
    }

    //ngOnInit(): khi đc load
    ngOnInit() {
        debugger;
        this.roleService.getRoles().subscribe({
            next: (roles: Role[]) => {
                debugger;
                this.roles = roles;
                this.selectedRole = roles.length > 0 ? roles[0] : undefined;
            },
        });
    }

    onPhoneChange() {
        console.log(`Phone typed: ${this.phone}`);
    }
    login() {
        // const message = `phone: ${this.phone}` + `password: ${this.password}`;
        debugger;
        // alert(message);
        const loginDTO: LoginDTO = {
            phone_number: this.phone,
            password: this.password,
            role_id: this.selectedRole?.id ?? 1,
        };

        this.userService.login(loginDTO).subscribe({
            next: (response: LoginResponse) => {
                debugger;
                const { token } = response;
                if (this.rememberMe) {
                    this.tokenService.setToken(token);
                    this.userService.getUserDetails(token).subscribe({
                        next: (response: any) => {
                            debugger;
                            this.userResponse = {
                                ...response,
                                date_of_birth: new Date(response.date_of_birth),
                            };
                            this.userService.saveUserResponseToLocalStorage(this.userResponse);
                            if (this.userResponse?.role_id.id === 2) {
                                this.errorMesssage = 'Đăng nhập thành công vào Admin';
                            } else if (this.userResponse?.role_id.id === 1) {
                                this.errorMesssage = 'Đăng nhập thành công';
                            }
                        },
                        complete: () => {
                            this.showNotificationAndNavigate();
                            debugger;
                        },
                        error: (err: any) => {
                            this.errorMesssage = err.error;
                            this.showNotification();
                        },
                    });
                }
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                debugger;
                // handle error if any

                this.errorMesssage = error.error.message;
                this.showNotification();
            },
        });
    }

    showNotification() {
        const toastLiveExample = document.getElementById('liveToast');
        const toast = new bootstrap.Toast(toastLiveExample);
        toast.show();
    }

    showNotificationAndNavigate() {
        const toastLiveExample = document.getElementById('liveToast');
        const toast = new bootstrap.Toast(toastLiveExample);
        toast.show();
        // Thêm callback function để điều hướng sau khi toast được hiển thị
        toastLiveExample!.addEventListener('hidden.bs.toast', () => {
            if (this.userResponse?.role_id.id === 2) {
                this.router.navigate(['/admin']);
            } else if (this.userResponse?.role_id.id === 1) {
                this.router.navigate(['/']);
            }
        });
    }
}
