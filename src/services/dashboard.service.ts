import httpRequest from '../utils/httpRequest';
import { IDashboardData } from '../interfaces/dashboard.interface';

export const get = async (shopId: string): Promise<IDashboardData | undefined> => {
    try {
        const result = await httpRequest.get(`/dashboard?shopId=${shopId}`);
        return result.data.data;
    } catch (error) {
        console.log(`file: dashboard.service.ts:9 > error:`, error);
    }
};
