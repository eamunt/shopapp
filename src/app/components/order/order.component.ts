import { ProductService } from 'src/app/service/product.service';
import { CartService } from 'src/app/service/cart.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { OrderDTO } from 'src/dtos/order/order.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/app/environments/environment';
import { OrderService } from 'src/app/service/order.serivce';
import { TokenService } from 'src/app/service/token.service';

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
        user_id: parseInt(this.tokenService.getCurrentUserId()!),
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
        private tokenService: TokenService,
        private fb: FormBuilder, // private orderService: OrderService,
    ) {
        this.orderForm = this.fb.group({
            fullname: ['Hao nguyen', Validators.required],
            email: ['haonguyen@gmail.com', Validators.required],
            phone_number: ['123456', [Validators.required, Validators.minLength(6)]],
            address: ['camau viet mam', [Validators.required, Validators.minLength(6)]],
            note: ['nhe tay'],
            shipping_method: ['express'],
            payment_method: ['cod'],
        });
    }
    ngOnInit(): void {
        debugger;
        // lấy danh sách product từ cart
        const cart = this.cartService.getCart();
        const productIds = Array.from(cart.keys());

        debugger;
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
            }));

            // dữ liệu hợp lệ => gửi request
            this.orderService.placeOrder(this.orderDTO).subscribe({
                next: (response) => {
                    debugger;
                    console.log('Đặt hàng thành công' + response);
                },
                complete: () => {
                    debugger;
                    this.calculateTotal();
                },
                error: (error: any) => {
                    debugger;
                    console.error('Lỗi khi đặt hàng', error);
                },
            });
        } else {
            alert('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại');
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
