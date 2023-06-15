import {
    IInvoice,
    IInvoiceItemGroup,
    IInvoiceResponse,
    IUpdateInvoiceOptional,
    IUpdateQuantityDelivered,
    IUpdateQuantityDone,
} from '../interfaces/invoice.interface';
import httpRequest from '../utils/httpRequest';

export const create = async (invoice: IInvoice): Promise<IInvoiceResponse | undefined> => {
    try {
        const result = await httpRequest.post('/invoice', invoice);
        return result.data.data;
    } catch (error) {
        console.log(`file: invoice.service.ts:9 > error:`, error);
    }
};

export const getByUser = async (userId: string): Promise<IInvoiceResponse[] | undefined> => {
    try {
        const result = await httpRequest.get(`/invoice?userId=${userId}`);
        return result.data.data;
    } catch (error) {
        console.log(`file: invoice.service.ts:18 > error:`, error);
    }
};

export const getByShop = async (shopId: string): Promise<IInvoiceResponse[] | undefined> => {
    try {
        const result = await httpRequest.get(`/invoice?shopId=${shopId}`);
        if (result.data.data) {
            return result.data.data;
        }
    } catch (error) {
        console.log(`file: invoice.service.ts:27 > error:`, error);
    }
};

export const update = async (invoice: IInvoice): Promise<IInvoiceResponse | undefined> => {
    try {
        const result = await httpRequest.put(`/invoice`, invoice);
        return result.data.data;
    } catch (error) {
        console.log(`file: invoice.service.ts:36 > error:`, error);
    }
};

export const updateOptional = async (invoice: IUpdateInvoiceOptional): Promise<IInvoiceResponse | undefined> => {
    try {
        const result = await httpRequest.put(`/invoice`, invoice);
        return result.data.data;
    } catch (error) {
        console.log(`file: invoice.service.ts:36 > error:`, error);
    }
};

export const updateQuantityDone = async (items: IUpdateQuantityDone[]): Promise<IInvoiceResponse[] | undefined> => {
    try {
        const result = await httpRequest.put(`/invoice/done`, { items });
        return result.data.data;
    } catch (error) {
        console.log(`file: invoice.service.ts:52 > error:`, error);
    }
};

export const updateQuantityDelivered = async (
    item: IUpdateQuantityDelivered,
): Promise<IInvoiceResponse[] | undefined> => {
    try {
        const result = await httpRequest.put(`/invoice/delivered`, { ...item });
        return result.data.data;
    } catch (error) {
        console.log(`file: invoice.service.ts:65 > error:`, error);
    }
};
