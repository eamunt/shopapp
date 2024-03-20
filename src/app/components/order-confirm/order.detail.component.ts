import { OrderDetail } from '../../models/model.detail';
import { OrderService } from 'src/app/service/order.serivce';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { OrderResponse } from 'src/app/responses/order/order.response';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order.detail.component.html',
    styleUrls: ['./order.detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
    orderResponse: OrderResponse = {
        id: 0,
        user_id: 0,
        fullname: '',
        phone_number: '',
        email: '',
        address: '',
        note: '',
        order_date: new Date(),
        status: '',
        total_money: 0,
        shipping_method: '',
        shipping_address: '',
        shipping_date: new Date(),
        payment_method: '',
        order_details: [],
    };
    constructor(private orderService: OrderService) {}

    ngOnInit(): void {
        this.getOrderDetails();
    }
    getOrderDetails(): void {
        debugger;
        const orderId = 13;
        this.orderService.getOrderById(orderId).subscribe({
            next: (response: any) => {
                this.orderResponse.id = response.id;
                this.orderResponse.user_id = response.user_id;
                this.orderResponse.fullname = response.fullname;
                this.orderResponse.email = response.email;
                this.orderResponse.address = response.address;
                this.orderResponse.note = response.note;
                this.orderResponse.order_date = new Date(
                    response.order_date[0],
                    response.order_date[1] - 1,
                    response.order_date[2],
                );
                debugger;
                this.orderResponse.status = response.status;
                this.orderResponse.total_money = response.total_money;
                this.orderResponse.shipping_method = response.shipping_method;
                this.orderResponse.shipping_address = response.shipping_address;
                if (response.shipping_date != null) {
                    this.orderResponse.shipping_date = new Date(
                        response.shipping_date[0],
                        response.shipping_date[1] - 1,
                        response.shipping_date[2],
                    );
                }

                this.orderResponse.payment_method = response.payment_method;
                this.orderResponse.order_details = response.order_details.map(
                    (order_detail: OrderDetail) => {
                        debugger;
                        order_detail.productId.thumbnail = `${environment.apiBaseUrl}/products/images/${order_detail.productId.thumbnail}`;
                        return order_detail;
                    },
                );
                debugger;
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                debugger;
                console.error('lỗi', error);
            },
        });
    }
}
