import { IProduct } from '../interfaces/product.interface';
import httpRequest from '../utils/httpRequest';

export const getProduct = async (slug: string): Promise<IProduct | undefined> => {
    try {
        const result = await httpRequest.get(`/product?slug=${slug}`);
        return result.data.data as IProduct;
    } catch (error) {
        console.log(`file: product.service.ts:8 > error:`, error);
    }
};

export const getRecommend = async (): Promise<IProduct[] | undefined> => {
    try {
        const result = await httpRequest.get(`/product/recommend`);
        return result.data.data as IProduct[];
    } catch (error) {
        console.log(`file: product.service.ts:18 > error:`, error);
    }
};

export const getByCategories = async (shopName: string, size: number): Promise<IProduct[] | undefined> => {
    try {
        const result = await httpRequest.get(`/product/categories?shopName=${shopName}&size=${size}`);
        return result.data.data as IProduct[];
    } catch (error) {
        console.log(`file: product.service.ts:28 > error:`, error);
    }
};

export const getByCategory = async (slug: string): Promise<IProduct[] | undefined> => {
    try {
        const result = await httpRequest.get(`/product/category?slug=${slug}`);
        return result.data.data as IProduct[];
    } catch (error) {
        console.log(`file: product.service.ts:36 > error:`, error);
    }
};
