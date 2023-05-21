import { IProduct } from './product.interface';

export interface ICartItem {
    product: IProduct;
    quantity: number;
}

export interface ICartItemRequest {
    productId: string;
    price: number;
    quantity: number;
}

export interface ICart {
    userId?: string;
    items: ICartItem[];
}
