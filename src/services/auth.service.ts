import httpRequest from '../utils/httpRequest';
import { IUserResponse } from '../interfaces/auth.interface';

export const login = async (email: string, password: string): Promise<IUserResponse | undefined> => {
    try {
        console.log(email, password);

        const result = await httpRequest.post('/auth/login', { email, password });
        console.log(`file: auth.service.ts:9 > result:`, result);

        return result.data.data;
    } catch (error) {
        console.log(`file: category.service.ts:10 > error:`, error);
    }
};
