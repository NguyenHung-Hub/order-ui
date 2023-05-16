import { ITimeStamps } from './index.interface';

export interface IRole extends ITimeStamps {
    _id?: string;
    name: string;
    description: string;
}
