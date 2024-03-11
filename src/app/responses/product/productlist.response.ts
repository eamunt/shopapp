import { Product } from 'src/app/models/product';

export interface ProductListResponse {
    products: Product[];
    totalPages: number;
}
