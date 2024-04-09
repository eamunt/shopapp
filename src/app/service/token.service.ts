import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './user.service';
@Injectable({
    providedIn: 'root',
})
export class TokenService {
    private readonly TOKEN_KEY = 'access_token';
    private jwtHelperSerivce = new JwtHelperService();
    private USER_ID = 'user_id';
    constructor(private userService: UserService) {}
    //getter
    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }
    //setter
    setToken(token: string): void {
        debugger;
        localStorage.setItem(this.TOKEN_KEY, token);
    }
    //remove
    removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }
    isTokenExpired(): boolean {
        if (this.getToken() == null) {
            return false;
        }
        return this.jwtHelperSerivce.isTokenExpired(this.getToken());
    }

    getUserId(): any {
        debugger;
        let userObject = this.jwtHelperSerivce.decodeToken(this.getToken() ?? '');
        if (userObject != null) {
            return 'userId' in userObject ? parseInt(userObject['userId']) : 0;
        } else {
            return null;
        }
    }

    logout(): void {
        // Xóa thông tin đăng nhập từ Local Storage
        this.removeToken();
        this.userService.removeUserFromLocalStorage();
        // Chuyển hướng người dùng đến trang đăng nhập
        window.location.href = '/login';
    }
}
