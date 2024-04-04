import { ProductService } from 'src/app/service/product.service';
import { CartService } from 'src/app/service/cart.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { OrderDTO } from 'src/dtos/order/order.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/app/environments/environment';
import { OrderService } from 'src/app/service/order.serivce';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
declare var bootstrap: any;
@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
    orderForm: FormGroup; // đối tượng FormGroup quản lý dữ liệu của form
    cartItems: { product: Product; quantity: number }[] = [];
    couponCode: string = '';
    totalAmount: number = 0;
    orderDTO: OrderDTO = {
        // phải get từ LocalStorage
        user_id: this.tokenService.getUserId(),
        fullname: '',
        email: '',
        phone_number: '',
        address: '',
        note: '',
        total_money: 0,
        payment_method: 'cod',
        shipping_method: 'express',
        coupon_code: '',
        cart_items: [],
    };
    constructor(
        private cartService: CartService,
        private productService: ProductService,
        private orderService: OrderService,
        private userService: UserService,
        private tokenService: TokenService,
        private router: Router,
        private fb: FormBuilder, // private orderService: OrderService,
    ) {
        this.orderForm = this.fb.group({
            fullname: ['Hao nguyen', Validators.required],
            email: ['haonguyen@gmail.com', Validators.required],
            phone_number: ['', [Validators.required, Validators.minLength(6)]],
            address: ['camau viet mam', [Validators.required, Validators.minLength(6)]],
            note: ['nhe tay'],
            shipping_method: ['express'],
            payment_method: ['cod'],
        });
    }
    ngOnInit(): void {
        debugger;
        this.orderDTO.user_id = this.tokenService.getUserId();
        // lấy danh sách product từ cart
        // this.cartService.clearCart();
        const cart = this.cartService.getCart();
        const productIds = Array.from(cart.keys());

        debugger;
        if (productIds.length === 0) {
            return;
        }
        this.productService.getProductsByIds(productIds).subscribe({
            next: (products) => {
                debugger;
                // get info products and quantity from products list and cart
                this.cartItems = productIds.map((productId) => {
                    debugger;
                    const product = products.find((p) => p.id === productId);
                    if (product) {
                        product.thumbnail = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
                    }
                    return {
                        product: product!,
                        quantity: cart.get(productId)!,
                    };
                });
            },
            complete: () => {
                debugger;
                this.calculateTotal();
            },
            error: (error: any) => {
                debugger;
                console.error('error fectching details', error);
            },
        });

        // hiển thị toast thông báo lỗi
        const toastTrigger = document.getElementById('confirmOder');
        const toastLiveExample = document.getElementById('liveToast');
        if (toastTrigger) {
            toastTrigger.addEventListener('click', () => {
                // kiểm tra valid data
                if (this.orderForm.valid) {
                    this.placeOrder();
                } else {
                    // hiện toast
                    const toast = new bootstrap.Toast(toastLiveExample);
                    toast.show();
                }
            });
        }
    }

    placeOrder() {
        debugger;
        if (this.orderForm.valid) {
            // sử dụng spread operator
            this.orderDTO = {
                ...this.orderDTO,
                ...this.orderForm.value,
            };

            // bổ sung cartItems
            this.orderDTO.cart_items = this.cartItems.map((cartItem) => ({
                product_id: cartItem.product.id,
                quantity: cartItem.quantity,
                total_money: cartItem.product.price * cartItem.quantity,
            }));
            this.orderDTO.total_money = this.totalAmount;

            // dữ liệu hợp lệ => gửi request
            this.orderService.placeOrder(this.orderDTO).subscribe({
                next: (response) => {
                    debugger;
                    this.cartService.clearCart();
                    this.router.navigate(['/orders/', response.id]);
                },
                complete: () => {
                    debugger;
                    this.calculateTotal();
                },
                error: (error: any) => {
                    debugger;
                },
            });
        }
    }

    // calulate total amount
    calculateTotal(): void {
        this.totalAmount = this.cartItems.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0,
        );
    }

    // apply coupon
    applyCoupon(): void {}
}
