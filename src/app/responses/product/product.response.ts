import { ProductImage } from 'src/app/models/product.image';

export interface ProductResponse {
    id: number;
    url: string;
    name: string;
    thumbnail: string;
    description: string;
    price: number;
    product_images: ProductImage[];
}
