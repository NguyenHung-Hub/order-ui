import { ICartItem, ICartItemRequest } from './cart.interface';
import { ITimeStamps } from './index.interface';
import { IProduct } from './product.interface';

interface IInvoiceBase {
    shopId: string;
    customerId?: string;
    customerName?: string;
    customerPhone?: string;
}
export interface IInvoice extends IInvoiceBase {
    carts: ICartItemRequest[];
}

export interface IInvoiceResponse extends ITimeStamps, IInvoiceBase {
    _id: string;
    carts: IProduct[];
}
