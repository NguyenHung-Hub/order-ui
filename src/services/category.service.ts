import httpRequest from '../utils/httpRequest';
import { ICategory } from '../interfaces/category.interface';

export const createCategory = async (name: string): Promise<ICategory | undefined> => {
    try {
        const result = await httpRequest.post('/category', { name });

        return result.data.data as ICategory;
    } catch (error) {
        console.log(`file: category.service.ts:5 > error:`, error);
    }
};

export const getCategories = async (): Promise<ICategory[] | undefined> => {
    try {
        const result: ICategory[] = await httpRequest.get('/category');

        return result;
    } catch (error) {
        console.log(`file: category.service.ts:19 > error:`, error);
    }
};

export const updateCategory = async (category: ICategory): Promise<ICategory | undefined> => {
    try {
        const result: ICategory = await httpRequest.put('/category', category);

        return result;
    } catch (error) {
        console.log(`file: category.service.ts:29 > error:`, error);
    }
};

export const deleteCategory = async (id: string): Promise<string | undefined> => {
    console.log(`file: category.service.ts:35 > id:`, id);
    try {
        const result = await httpRequest.delete('/category', { params: { id } });

        return result.data.data as string;
    } catch (error) {
        console.log(`file: category.service.ts:29 > error:`, error);
    }
};
