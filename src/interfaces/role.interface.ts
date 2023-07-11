import { ITimeStamps } from './index.interface';

export interface IRole extends ITimeStamps {
    _id?: string;
    name: 'manager' | 'waiter' | 'chef' | 'customer';
    description: string;
}
