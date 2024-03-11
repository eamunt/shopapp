import { Product } from './../models/product';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private apiGetAllProducts = `${environment.apiBaseUrl}/products`;
    constructor(private http: HttpClient) {}
    getProducts(page: number, limit: number): Observable<any> {
        const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
        return this.http.get<Product[]>(this.apiGetAllProducts, { params });
    }
}
