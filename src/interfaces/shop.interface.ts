import { ITimeStamps } from './index.interface';

export interface IShop extends ITimeStamps {
    _id: string;
    name: string;
    address: string;
    logo: string;
}
