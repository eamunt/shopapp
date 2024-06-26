import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/models/product';
import { ProductImage } from 'src/app/models/product.image';
import { UserResponse } from 'src/app/responses/user/user.response';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';
declare var $: any;
declare var bootstrap: any;
@Component({
    selector: 'app-detail-product',
    templateUrl: './detail-product.component.html',
    styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
    product?: Product;
    productId: number = 0;
    currentImageIndex: number = 0;
    quantity: number = 1;
    userResponse?: UserResponse | null;
    isPressedAddToCart: boolean = false;
    constructor(
        private productService: ProductService, //private categoryService CategoryService, //private router: Router, //private activateRoute ActivatedRoute
        private cartService: CartService,
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        /// Lấy productId từ URL
        const idParam = this.activatedRoute.snapshot.paramMap.get('id');
        // debugger;
        // this.cartService.clearCart();
        // const idParam = 8;
        if (idParam !== null) {
            this.productId = +idParam;
        }
        // is Not A Number
        if (!isNaN(this.productId)) {
            this.productService.getDetailProduct(this.productId).subscribe({
                next: (response: any) => {
                    // lất list product và thay đổi url
                    if (response.product_images && response.product_images.length > 0) {
                        debugger;
                        response.product_images.forEach((product_image: ProductImage) => {
                            product_image.image_url = `${environment.apiBaseUrl}/products/images/${product_image.imageUrl}`;
                            debugger;
                        });
                        debugger;
                    }
                    debugger;
                    this.product = response;
                    // bắt đầu với hình ảnh đàu tiên
                    this.showImage(0);
                },
                complete: () => {
                    debugger;
                },
                error: (err: any) => {
                    debugger;
                    console.error('Error fetching detail product: ', err);
                },
            });
        } else {
            console.error('Invalid ProductId', idParam);
        }

        // hiển thị toast thông báo lỗi khi addToCard mà chưa login
        const toastTrigger = document.getElementById('addToCartBtn');
        const toastLiveExample = document.getElementById('liveToast');
        this.userResponse = this.userService.getUserResponseFromLocalStorage();
        if (toastTrigger) {
            toastTrigger.addEventListener('click', () => {
                // kiểm tra login
                if (this.userResponse) {
                    debugger;
                    // hiển thị thông báo bên cạnh rằng đã thêm vào giỏ hàng
                    $('p').on('addToCartEvent', (event: any, myName: string) => {
                        $('#addToCart')
                            .stop()
                            .css('opacity', 1)
                            .text('Đã thêm vào giỏ hàng')
                            .fadeToggle(1800);
                    });

                    $('p').trigger('addToCartEvent');

                    this.addToCart();
                } else {
                    // hiện toast
                    const toast = new bootstrap.Toast(toastLiveExample);
                    toast.show();
                }
            });
        }
    }

    showImage(index: number): void {
        debugger;
        if (this.product && this.product.product_images && this.product.product_images.length > 0) {
            if (index < 0) {
                index = this.product.product_images.length - 1;
            } else if (index >= this.product.product_images.length) {
                index = 0;
            }
            //Gán index hiện tại và cập nhật ảnh hiển thị
            this.currentImageIndex = index;
        }
    }
    thumbnailClick(index: number) {
        debugger;
        //Gọi khi 1 thumbnail đc bấm
        this.currentImageIndex = index;
    }

    nextImage(): void {
        debugger;
        this.showImage(this.currentImageIndex + 1);
    }

    previousImage(): void {
        debugger;
        this.showImage(this.currentImageIndex - 1);
    }

    // cart
    addToCart(): void {
        debugger;
        this.isPressedAddToCart = true;
        if (this.product) {
            this.cartService.addToCart(this.product.id, this.quantity);
        } else {
            // if the product is null
            console.error('Không thể thêm sản phẩm vào giỏ hàng vì product là null');
        }
    }

    increaseQuantity(): void {
        this.quantity++;
    }
    decreaseQuantity(): void {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }

    buyNow(): void {
        if (this.isPressedAddToCart == false) {
            this.addToCart();
        }
        this.router.navigate(['/orders']);
    }
}
