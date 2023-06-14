import httpRequest from '../utils/httpRequest';
import { IUserResponse } from '../interfaces/auth.interface';

export const login = async (email: string, password: string): Promise<IUserResponse | undefined> => {
    try {
        const result = await httpRequest.post('/auth/login', { email, password });
        return result.data.data;
    } catch (error) {
        console.log(`file: category.service.ts:10 > error:`, error);
    }
};
