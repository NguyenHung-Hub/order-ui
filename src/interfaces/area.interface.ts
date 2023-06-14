import { ITimeStamps } from './index.interface';
import { ITable } from './table.interface';

export interface IAreaBase extends ITimeStamps {
    _id?: string;
    userId?: string;
    name: string;
    slug: string;
}

export interface IArea extends IAreaBase {
    tables: ITable[] | [];
}

export interface IAreaResponse extends IAreaBase {
    table: ITable;
}
export interface IAreaInfo {
    areaId: string;
    areaName: string;
    tableId: string;
    tableName: string;
}
