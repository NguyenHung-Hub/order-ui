import { ITimeStamps } from './index.interface';

export interface ICategory extends ITimeStamps {
    _id?: string;
    name: string;
    slug: string;
}
