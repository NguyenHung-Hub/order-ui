import { IInvoiceResponse } from '../interfaces/invoice.interface';
import { formatMoney } from './format';

export function calcTotal(invoice: IInvoiceResponse) {
    const total = invoice.items.reduce((acc, item) => acc + item.product.priceSale * item.quantity, 0);
    return formatMoney(total);
}
