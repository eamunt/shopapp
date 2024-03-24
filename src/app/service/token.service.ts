import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
    providedIn: 'root',
})
export class TokenService {
    private readonly TOKEN_KEY = 'access_token';
    private jwtHelperSerivce = new JwtHelperService();
    private USER_ID = 'user_id';
    constructor() {}
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

    getUserId(): number {
        debugger;
        let userObject = this.jwtHelperSerivce.decodeToken(this.getToken() ?? '');
        return 'userId' in userObject ? parseInt(userObject['userId']) : 0;
    }

    logout(): void {
        // Xóa thông tin đăng nhập từ Local Storage
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem('user');
        // Chuyển hướng người dùng đến trang đăng nhập
        window.location.href = '/login';
    }
}
