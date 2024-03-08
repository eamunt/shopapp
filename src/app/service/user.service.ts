import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from 'src/dtos/user/register.dto';
import { LoginDTO } from 'src/dtos/user/login.dto';
@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiRegister = `${environment.apiBaseUrl}/users/register`;
    private apiLogin = `${environment.apiBaseUrl}/users/login`;
    private apiConfig = {
        headers: this.createHeaders(),
    };

    constructor(private http: HttpClient) {}
    private createHeaders(): HttpHeaders {
        return new HttpHeaders({ 'Content-Type': 'application/json' });
    }
    //register
    register(registerDTO: RegisterDTO): Observable<any> {
        return this.http.post(this.apiRegister, registerDTO, this.apiConfig);
    }

    //login
    login(loginDTO: LoginDTO): Observable<any> {
        return this.http.post(this.apiLogin, loginDTO, this.apiConfig);
    }
}