import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderListResponse } from 'src/app/responses/order/orderlist.response';
import { UserResponse } from 'src/app/responses/user/user.response';
import { OrderService } from 'src/app/service/order.serivce';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';

@Component({
    selector: 'app-detail-order-admin',
    templateUrl: './detail.order.admin.component.html',
    styleUrls: ['./detail.order.admin.component.scss'],
})
export class DetailOrderAdminComponent implements OnInit {
    constructor(private router: Router, private tokenService: TokenService) {}
    ngOnInit(): void {}

    generateVisiblePageArray(currentPage: number, totalPages: number) {
        debugger;
        const maxVisiblePages = 5;
        const halfVisiblePages = Math.floor(maxVisiblePages / 2);

        let startPage = Math.max(currentPage - halfVisiblePages, 0);
        let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(endPage - maxVisiblePages + 1, 0);
        }
        return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
    }
}
