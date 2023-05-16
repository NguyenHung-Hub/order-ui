import httpRequest from '../utils/httpRequest';
import { IArea } from '../interfaces/area.interface';

export const createArea = async (name: string): Promise<IArea | undefined> => {
    try {
        const result = await httpRequest.post('/area', { name, userId: '644e8d0de6acae48f19afc23' });

        return result.data.data as IArea;
    } catch (error) {
        console.log(`file: area.service.ts:10 > error:`, error);
    }
};

export const getAreas = async (): Promise<IArea[] | undefined> => {
    try {
        const result: IArea[] = await httpRequest.get('/area');

        return result;
    } catch (error) {
        console.log(`file: area.service.ts:20 > error:`, error);
    }
};

export const updateArea = async (area: IArea): Promise<IArea | undefined> => {
    try {
        const result: IArea = await httpRequest.put('/area', area);

        return result;
    } catch (error) {
        console.log(`file: area.service.ts:30 > error:`, error);
    }
};

export const deleteArea = async (id: string): Promise<string | undefined> => {
    try {
        const result = await httpRequest.delete('/area', { params: { id } });

        return result.data.data as string;
    } catch (error) {
        console.log(`file: area.service.ts:40 > error:`, error);
    }
};

export const createTable = async (areaId: string, name: string): Promise<IArea | undefined> => {
    try {
        const result = await httpRequest.post('/area/table', { name, areaId });

        return result.data.data as IArea;
    } catch (error) {
        console.log(`file: area.service.ts:50 > error:`, error);
    }
};

export const updateTable = async (areaId: string, tableId: string, name: string): Promise<IArea | undefined> => {
    try {
        const result = await httpRequest.put('/area/table', { name, areaId, _id: tableId });

        return result.data.data as IArea;
    } catch (error) {
        console.log(`file: area.service.ts:60 > error:`, error);
    }
};

export const deleteTable = async (areaId: string, id: string): Promise<string | undefined> => {
    try {
        const result = await httpRequest.delete('/area/table', { params: { areaId, id } });

        return result.data.data as string;
    } catch (error) {
        console.log(`file: area.service.ts:70 > error:`, error);
    }
};
