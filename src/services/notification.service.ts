import httpRequest from '../utils/httpRequest';
import { INotification, INotificationResponse } from '../interfaces/notification.interface';

export const create = async (notification: INotification): Promise<INotificationResponse | undefined> => {
    try {
        const result = await httpRequest.post('/notification', notification);
        return result.data.data;
    } catch (error) {
        console.log(`file: notification.service.ts:9 > error:`, error);
    }
};

export const get = async (userId: string): Promise<INotificationResponse[] | undefined> => {
    try {
        const result = await httpRequest.get(`/notification?userId=${userId}`);
        return result.data.data;
    } catch (error) {
        console.log(`file: notification.service.ts:18 > error:`, error);
    }
};

export const updateStatusRead = async (
    notificationId: string,
    status: boolean,
): Promise<INotificationResponse | undefined> => {
    try {
        const result = await httpRequest.put(`/notification`, { notificationId, status });
        return result.data.data;
    } catch (error) {
        console.log(`file: notification.service.ts:30 > error:`, error);
    }
};
