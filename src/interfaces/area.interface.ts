import { ITimeStamps } from './index.interface';
import { ITable } from './table.interface';

export interface IArea extends ITimeStamps {
    _id?: string;
    userId?: string;
    name: string;
    slug: string;
    tables: ITable[] | [];
}
