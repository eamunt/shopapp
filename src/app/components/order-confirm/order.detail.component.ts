import { OrderDetail } from '../../models/model.detail';
import { OrderService } from 'src/app/service/order.serivce';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order.detail.component.html',
    styleUrls: ['./order.detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
    orderId: number = 0;
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
        created_at: new Date(),
        updated_at: new Date(),
    };
    order_date_updated: any;
    constructor(private orderService: OrderService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.getOrderDetails();
    }
    getOrderDetails(): void {
        debugger;
        this.orderId = parseInt(this.route.snapshot.paramMap.get('id')!);
        this.orderService.getOrderById(this.orderId).subscribe({
            next: (response: any) => {
                this.orderResponse.id = response.id;
                this.orderResponse.user_id = response.user_id;
                this.orderResponse.phone_number = response.phone_number;
                this.orderResponse.fullname = response.fullname;
                this.orderResponse.email = response.email;
                this.orderResponse.address = response.address;
                this.orderResponse.note = response.note;
                var todate = new Date(response.order_date).getDate();
                var tomonth = new Date(response.order_date).getMonth() + 1;
                var toyear = new Date(response.order_date).getFullYear();
                var h = new Date(response.order_date).getHours();
                var m = new Date(response.order_date).getMinutes();
                var s = new Date(response.order_date).getSeconds();
                this.order_date_updated =
                    todate + '/' + tomonth + '/' + toyear + ' ' + h + ':' + m + ':' + s;
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
