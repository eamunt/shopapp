import { OrderDTO } from '../../../../dtos/order/order.dto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { OrderDetail } from 'src/app/models/model.detail';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { OrderService } from 'src/app/service/order.serivce';

@Component({
    selector: 'app-detail-order-admin',
    templateUrl: './detail.order.admin.component.html',
    styleUrls: ['./detail.order.admin.component.scss'],
})
export class DetailOrderAdminComponent implements OnInit {
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

    constructor(
        private route: ActivatedRoute,
        private orderService: OrderService,
        private router: Router,
    ) {}
    ngOnInit(): void {
        this.getOrderDetails();
    }

    getOrderDetails(): void {
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
    saveOrder(): void {
        debugger;
        this.orderService.updateOrder(this.orderId, new OrderDTO(this.orderResponse)).subscribe({
            next: (response: any) => {
                debugger;
                console.log('Order updated successfully', response);
                //navigate to the previous page
                this.router.navigate(['../'], { relativeTo: this.route });
            },
            complete: () => {
                debugger;
            },
            error: (err: any) => {
                debugger;
                console.error('error updating order:', err);
            },
        });
    }
}
