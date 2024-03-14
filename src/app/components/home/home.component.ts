import { CategoryService } from './../../service/category.service';
import { ProductListResponse } from './../../responses/product/productlist.response';
import { Component } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';
import { Category } from 'src/app/models/category';
import { CategoryListReponse } from 'src/app/responses/category/categorylist.response';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    products: Product[] = [];
    currentPage: number = 0;
    itemsPerPage: number = 12;
    pages: number[] = [];
    totalPages: number = 0;
    visiblePages: number[] = [];
    keyword: string = '';
    selectedCategoryId: number = 0;
    categories: Category[] = [];

    constructor(private productService: ProductService, private categoryService: CategoryService) {}

    ngOnInit() {
        this.getProducts(
            this.keyword,
            this.selectedCategoryId,
            this.currentPage,
            this.itemsPerPage,
        );
        this.getCategories(0, 100);
    }

    getCategories(page: number, limit: number) {
        this.categoryService.getCategories(page, limit).subscribe({
            next: (categoryList: CategoryListReponse) => {
                debugger;
                this.categories = categoryList.categories;
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                debugger;
                console.error('Error fetching categories: ' + error.message);
            },
        });
    }

    searchProducts() {
        this.currentPage = 0;
        this.itemsPerPage = 12;
        debugger;
        this.getProducts(
            this.keyword,
            this.selectedCategoryId,
            this.currentPage,
            this.itemsPerPage,
        );
    }

    getProducts(keyword: string, selectedCategoryId: number, page: number, limit: number) {
        this.productService.getProducts(keyword, selectedCategoryId, page, limit).subscribe({
            next: (productList: ProductListResponse) => {
                debugger;
                productList.products.forEach((product: Product) => {
                    product.url = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
                });
                this.products = productList.products;
                this.totalPages = productList.totalPages;
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
        this.getProducts(
            this.keyword,
            this.selectedCategoryId,
            this.currentPage,
            this.itemsPerPage,
        );
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
}
