import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
})
export class TokenService {
    private TOKEN_KEY = 'access_token';
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
}
