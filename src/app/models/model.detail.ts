import { Product } from './product';

export interface OrderDetail {
    id: number;
    productId: Product;
    price: number;
    numberOfProducts: number;
    totalMoney: number;
    color: string;
}
