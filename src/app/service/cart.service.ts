import { Injectable } from '@angular/core';
import { ProductService } from './product.service';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    // key: product id
    // value: is quantity
    private cart: Map<number, number> = new Map();
    constructor(private productService: ProductService) {
        // lấy dữ liệu giở hàng từ LocalStorage khi khởi tạo service
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            this.cart = new Map(JSON.parse(storedCart));
            /*
            {
                "2": 5,
                "3": 10
            }
            */
        }
    }
    addToCart(productId: number, quantity: number = 1): void {
        debugger;
        if (this.cart.has(productId)) {
            // if product exists already in cart, then increment quantity
            this.cart.set(productId, this.cart.get(productId)! + quantity);
        } else {
            // if product no exists already in cart, then add to cart with quantity
            this.cart.set(productId, quantity);
        }
        // save to LocalStorage
        this.saveCartToLocalStorage();
    }

    getCart(): Map<number, number> {
        return this.cart;
    }

    // save to local storage
    private saveCartToLocalStorage() {
        debugger;
        localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
    }

    clearCart(): void {
        this.cart.clear(); // xóa all data in the cart
        this.saveCartToLocalStorage();
    }
}
