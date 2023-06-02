import { IInvoice, IInvoiceItem, IInvoiceResponse, TInvoiceStatus } from '../interfaces/invoice.interface';
import { ICartItemRequest } from '../interfaces/cart.interface';

/**
 * transform data IInvoiceResponse to IInvoice
 */
export class UpdateInvoiceDto implements IInvoice {
    _id?: string | undefined;
    shopId: string;
    customerId?: string | undefined;
    customerName?: string | undefined;
    customerPhone?: string | undefined;
    status: TInvoiceStatus;
    items: IInvoiceItem[];

    constructor(data: IInvoiceResponse) {
        this._id = data._id;
        this.shopId = data.shopId;
        this.customerId = data.customerId;
        this.customerName = data.customerName;
        this.customerPhone = data.customerPhone;
        this.status = data.status;

        this.items = data.items.map(
            (i): IInvoiceItem => ({ productId: i.product._id as string, status: i.status, quantity: i.quantity }),
        );
    }
}
