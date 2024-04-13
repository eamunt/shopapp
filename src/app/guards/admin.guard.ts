import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    CanActivateFn,
} from '@angular/router';
import { Router } from '@angular/router'; // Đảm bảo bạn đã import Router ở đây.
import { inject } from '@angular/core';
import { TokenService } from '../service/token.service';
import { UserService } from '../service/user.service';
import { UserResponse } from '../responses/user/user.response';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard {
    userResponse?: UserResponse | null;
    constructor(
        private tokenService: TokenService,
        private router: Router,
        private userService: UserService,
    ) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        debugger;
        // check expired
        const isTokenExpired = this.tokenService.isTokenExpired();
        // check exsisting user

        const isUserIdValid = this.tokenService.getUserId();
        this.userResponse = this.userService.getUserResponseFromLocalStorage();
        const isAdmin = this.userResponse?.role_id.id === 2;

        debugger;
        if (!isTokenExpired && isUserIdValid && isAdmin) {
            return true;
        } else {
            // Nếu không authenticated, bạn có thể redirect hoặc trả về một UrlTree khác.
            // Ví dụ trả về trang login:
            this.router.navigate(['/login']);
            return false;
        }
    }
}

// Sử dụng functional guard như sau:
export const AdminGuardFn: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
): boolean => {
    debugger;
    return inject(AdminGuard).canActivate(next, state);
};
