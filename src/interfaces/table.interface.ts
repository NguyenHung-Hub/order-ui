import { ITimeStamps } from './index.interface';

export interface ITable extends ITimeStamps {
    _id?: string;
    name: string;
}
