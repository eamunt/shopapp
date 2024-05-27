import { Injectable, Inject } from '@angular/core';
import { Product } from '../models/product';
import { CommonModule, DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    // key: product id
    // value: is quantity
    private cart: Map<number, number> = new Map();
    localStorage?: Storage;
    constructor(@Inject(DOCUMENT) private document: Document) {
        this.localStorage = document.defaultView?.localStorage;
        // Lấy dữ liệu giỏ hàng từ localStorage khi khởi tạo service
        this.refreshCart();
    }

    public refreshCart() {
        const storedCart = this.localStorage?.getItem(this.getCartKey());
        if (storedCart) {
            this.cart = new Map(JSON.parse(storedCart));
        } else {
            this.cart = new Map<number, number>();
        }
    }

    getCartKey(): string {
        const userResponseJSON = this.localStorage?.getItem('user');
        const userResponse = JSON.parse(userResponseJSON!);
        return `cart:${userResponse?.id ?? ''}`;
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
        this.localStorage!.setItem(
            this.getCartKey(),
            JSON.stringify(Array.from(this.cart.entries())),
        );
    }

    clearCart(): void {
        this.cart.clear(); // xóa all data in the cart
        this.saveCartToLocalStorage();
    }

    getQuality(productId: number): number | undefined {
        return this.cart.get(productId);
    }

    removeItem(productId: number): void {
        this.cart.delete(productId);
        this.saveCartToLocalStorage();
    }
}
