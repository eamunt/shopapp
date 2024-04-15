import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';

export interface OrderListResponse {
    orders: Order[];
    totalPages: number;
}
