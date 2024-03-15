import { ProductImage } from './product.image';

export interface Product {
    id: number;
    url: string;
    thumbnail: string;
    name: string;
    price: number;
    description: string;
    category_id: number;
    product_images: ProductImage[];
}
