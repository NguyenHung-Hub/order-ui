import { IInvoice, IInvoiceResponse } from '../interfaces/invoice.interface';
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
            console.log(`file: invoice.service.ts:26 > result.data.data:`, result.data.data[3]);
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
