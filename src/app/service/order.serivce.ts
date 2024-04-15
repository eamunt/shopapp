import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OrderDTO } from 'src/dtos/order/order.dto';
import { Observable } from 'rxjs';
import { HttpUtilService } from './http.util.service';
import { OrderResponse } from '../responses/order/order.response';
import { OrderListResponse } from '../responses/order/orderlist.response';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private apiCreateOrder = `${environment.apiBaseUrl}/orders`;
    private apiGetOrder = `${environment.apiBaseUrl}/orders/get-orders-by-keyword`;
    constructor(private http: HttpClient) {}

    placeOrder(orderData: OrderDTO): Observable<any> {
        // Gửi yêu cầu đặt hàng
        debugger;
        return this.http.post(this.apiCreateOrder, orderData);
    }

    getOrderById(orderId: number): Observable<OrderResponse> {
        return this.http.get<any>(`${this.apiCreateOrder}/${orderId}`);
    }

    getAllOrders(keyword: string, page: number, limit: number): Observable<any> {
        debugger;
        const params = new HttpParams()
            .set('keyword', keyword.toString())
            .set('page', page.toString())
            .set('limit', limit.toString());
        return this.http.get<OrderListResponse>(this.apiGetOrder, { params });
    }
}
