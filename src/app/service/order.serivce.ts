import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { OrderDTO } from 'src/dtos/order/order.dto';
import { Observable } from 'rxjs';
import { HttpUtilService } from './http.util.service';
import { OrderResponse } from '../responses/order/order.response';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private apiCreateOrder = `${environment.apiBaseUrl}/orders`;
    constructor(private http: HttpClient) {}

    placeOrder(orderData: OrderDTO): Observable<any> {
        // Gửi yêu cầu đặt hàng
        return this.http.post(this.apiCreateOrder, orderData);
    }

    getOrderById(orderId: number): Observable<OrderResponse> {
        return this.http.get<any>(`${this.apiCreateOrder}/${orderId}`);
    }
}
