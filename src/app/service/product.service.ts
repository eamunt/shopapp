import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProductListResponse } from '../responses/product/productlist.response';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private apiGetAllProducts = `${environment.apiBaseUrl}/products`;

    constructor(private http: HttpClient) {}
    getProducts(
        keyword: string,
        selectedCategoryId: number,
        page: number,
        limit: number,
    ): Observable<any> {
        debugger;
        const params = new HttpParams()
            .set('keyword', keyword.toString())
            .set('category_id', selectedCategoryId.toString())
            .set('page', page.toString())
            .set('limit', limit.toString());
        return this.http.get<ProductListResponse>(this.apiGetAllProducts, { params });
    }
    getDetailProduct(productId: number): Observable<any> {
        debugger;
        return this.http.get<any>(`${this.apiGetAllProducts}/${productId}`);
    }
    getProductsByIds(productsIds: number[]): Observable<Product[]> {
        debugger;
        const params = new HttpParams().set('ids', productsIds.join(','));
        return this.http.get<Product[]>(`${this.apiGetAllProducts}/by-ids`, { params });
    }
}
