import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Product } from 'src/app/models/product';
import { ProductImage } from 'src/app/models/product.image';
import { ProductService } from 'src/app/service/product.service';

@Component({
    selector: 'app-detail-product',
    templateUrl: './detail-product.component.html',
    styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
    product?: Product;
    productId: number = 0;
    currentImageIndex: number = 0;
    constructor(
        private productService: ProductService, //private categoryService CategoryService, //private router: Router, //private activateRoute ActivatedRoute
    ) {}

    ngOnInit(): void {
        /// Lấy productId từ URL
        // const idParam = this.activateRoute.snapshot.paramMap.get('id);
        debugger;
        const idParam = 2;
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
}
