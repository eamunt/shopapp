import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from 'src/dtos/user/register.dto';
import { LoginDTO } from 'src/dtos/user/login.dto';
import { HttpUtilService } from './http.util.service';
import { UserResponse } from '../responses/user/user.response';
@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiRegister = `${environment.apiBaseUrl}/users/register`;
    private apiLogin = `${environment.apiBaseUrl}/users/login`;
    private apiDetails = `${environment.apiBaseUrl}/users/details`;
    private apiConfig = {
        headers: this.httpUtilService.createHeaders(),
    };

    constructor(private http: HttpClient, private httpUtilService: HttpUtilService) {}

    //register
    register(registerDTO: RegisterDTO): Observable<any> {
        return this.http.post(this.apiRegister, registerDTO, this.apiConfig);
    }

    //login
    login(loginDTO: LoginDTO): Observable<any> {
        return this.http.post(this.apiLogin, loginDTO, this.apiConfig);
    }
    getUserDetails(token: String) {
        return this.http.post(this.apiDetails, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }),
        });
    }

    saveUserResponseToLocalStorage(userResponse?: UserResponse) {
        try {
            if (userResponse == null || userResponse == undefined) {
                return;
            }
            // convert userResponse to a Json string
            const userResponseJSON = JSON.stringify(userResponse);

            // save Json string to local storage with key : userResponse
            localStorage.setItem('user', userResponseJSON);

            console.log('User saved to local storage');
        } catch (error) {
            console.log('Error saveing user to local storage', error);
        }
    }
    getUserResponseFromLocalStorage() {
        try {
            const userResponseJSON = localStorage.getItem('user');
            if (userResponseJSON == null || userResponseJSON == undefined) {
                return null;
            }
            const user = JSON.parse(userResponseJSON);
            return user;
        } catch (error) {
            console.log('Error get user to local storage', error);
        }
    }
    removeUserFromLocalStorage(): void {
        try {
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Error removing user from local storage', error);
        }
    }
}
