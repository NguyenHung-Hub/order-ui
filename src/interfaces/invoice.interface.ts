import { ICartItem, ICartItemRequest } from './cart.interface';
import { ITimeStamps } from './index.interface';
import { IProduct } from './product.interface';

export type TInvoiceStatus = 'waitingConfirm' | 'serving' | 'finish' | 'cancel';
export type TInvoiceItemStatus = 'waitingFood' | 'finishFood' | 'finish' | 'cancel';

export interface IInvoiceItemBase {
    quantity: number;
    status: TInvoiceItemStatus;
}

export interface IInvoiceItem extends IInvoiceItemBase {
    productId: string;
}

export interface IInvoiceItemResponse extends IInvoiceItemBase {
    product: IProduct;
}
interface IInvoiceBase {
    shopId: string;
    customerId?: string;
    customerName?: string;
    customerPhone?: string;
    status: TInvoiceStatus;
}
export interface IInvoice extends IInvoiceBase {
    _id?: string;
    items: IInvoiceItem[];
}

export interface IInvoiceResponse extends ITimeStamps, IInvoiceBase {
    _id: string;
    items: IInvoiceItemResponse[];
}

export interface IInvoiceStatus {
    waitingConfirm: Array<IInvoiceResponse> | [];
    serving: Array<IInvoiceResponse> | [];
    finish: Array<IInvoiceResponse> | [];
    cancel: Array<IInvoiceResponse> | [];
}
