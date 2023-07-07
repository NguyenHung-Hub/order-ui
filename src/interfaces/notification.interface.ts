import { ITimeStamps } from './index.interface';

export interface INotificationBase {
    sender: string;
    receiver: string;
    content: string;
    isRead: boolean;
}
export interface INotification extends INotificationBase {
    _id?: string;
}
export interface INotificationResponse extends INotificationBase, ITimeStamps {
    _id: string;
}

export interface IUpdateStatusNotification extends Pick<INotificationBase, 'isRead'> {
    _id: string;
}
