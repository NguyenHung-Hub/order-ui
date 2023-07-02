import { IInvoiceItemResponse, IInvoiceResponse } from '../interfaces/invoice.interface';
import { formatMoney } from './format';

export function calcTotal(items: IInvoiceItemResponse[]) {
    console.log(`file: calcInvoices.ts:5 > items:`, items);
    const total = items.reduce((acc, item) => acc + item.product.priceSale * item.quantity, 0);
    return formatMoney(total);
}
