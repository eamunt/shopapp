import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { OrderListResponse } from 'src/app/responses/order/orderlist.response';
import { UserResponse } from 'src/app/responses/user/user.response';
import { OrderService } from 'src/app/service/order.serivce';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';
declare var bootstrap: any;
@Component({
    selector: 'app-order-admin',
    templateUrl: './order.admin.component.html',
    styleUrls: ['./order.admin.component.scss'],
})
export class OrderAdminComponent implements OnInit {
    orders: Order[] = [];
    currentPage: number = 0;
    itemsPerPage: number = 10;
    pages: number[] = [];
    totalPages: number = 0;
    visiblePages: number[] = [];
    keyword: string = '';
    userReponse?: UserResponse | null;

    errorMesssage: string = '';

    constructor(
        private router: Router,
        private tokenService: TokenService,
        private userSerice: UserService,
        private orderService: OrderService,
    ) {}
    ngOnInit(): void {
        this.getOrders(this.keyword, this.currentPage, this.itemsPerPage);
    }

    handleItemClick(index: number): void {
        //alert(`Clicked on "${index}"`);
        // if (index === 2) {
        //     this.tokenService.logout();
        //     // this.userResponse = this.userService.getUserResponseFromLocalStorage();
        // }
        // this.isPopoverOpen = false; // Close the popover after clicking an item

        switch (index) {
            case 0:
                this.router.navigate(['/user-profile']);
                break;
            case 1:
                // Xử lý khi click vào "Đơn mua"
                break;
            case 2:
                // Xử lý khi click vào "Đăng xuất"
                debugger;
                this.tokenService.logout();
                break;
            default:
                break;
        }
    }

    getOrders(keyword: string, page: number, limit: number) {
        this.orderService.getAllOrders(keyword, page, limit).subscribe({
            next: (orderList: OrderListResponse) => {
                debugger;

                this.orders = orderList.orders;

                this.totalPages = orderList.totalPages;
                this.visiblePages = this.generateVisiblePageArray(
                    this.currentPage,
                    this.totalPages,
                );
            },
            complete: () => {
                debugger;
            },
            error: (err: any) => {
                debugger;
                console.error('Error fetching products: ' + err.message);
            },
        });
    }

    onPageChange(page: number) {
        debugger;
        this.currentPage = page;
        this.getOrders(this.keyword, this.currentPage, this.itemsPerPage);
    }

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

    viewDetails(order: Order) {
        this.router.navigate(['/admin/orders', order.id]);
    }

    deleteOrder(orderId: number) {
        {
            this.orderService.deleteOrder(orderId).subscribe({
                next: (response: any) => {
                    this.errorMesssage = response;
                    this.showNotificationAndNavigate();
                },
                complete: () => {
                    debugger;
                },
                error: (err: any) => {
                    console.log(err);
                },
            });
        }
    }

    showNotificationAndNavigate() {
        const toastLiveExample = document.getElementById('liveToast');
        const toast = new bootstrap.Toast(toastLiveExample);
        toast.show();
        // Thêm callback function để điều hướng sau khi toast được hiển thị
        toastLiveExample!.addEventListener('hidden.bs.toast', () => {
            location.reload();
        });
    }
}
