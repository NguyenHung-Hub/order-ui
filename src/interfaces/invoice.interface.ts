import { IAreaInfo } from './area.interface';
import { ICartItem, ICartItemRequest } from './cart.interface';
import { ITimeStamps } from './index.interface';
import { IProduct } from './product.interface';

export type TInvoiceStatus = 'waitingConfirm' | 'serving' | 'finish' | 'cancel';
export type TInvoiceItemStatus = 'waitingFood' | 'finishFood' | 'finish' | 'cancel';

export interface IInvoiceItemBase {
    quantity: number;
    done: number;
    delivered: number;
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
    area: IAreaInfo;
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

export interface IInvoiceItemGroup extends IInvoiceItemResponse {
    invoiceId: string;
}
export interface IInvoiceItemGroup2 extends IInvoiceItemResponse {
    invoiceId: string[];
}

export interface IInvoiceGroup extends ITimeStamps {
    shopId: string;
    group: IInvoiceItemGroup[];
}
export interface IInvoiceGroup2 extends ITimeStamps {
    shopId: string;
    group: IInvoiceItemGroup2[];
}

export interface IUpdateQuantityDone {
    invoiceId: string;
    productId: string;
    quantity: number;
    status: TInvoiceItemStatus;
}

export interface IUpdateQuantityDelivered extends IUpdateQuantityDone {}
