import { ActionContext } from 'vuex';
import { IArea } from '../../../interfaces/area.interface';
import { RootState, StoreBase } from '../../../interfaces/store.interface';
import httpRequest from '../../../utils/httpRequest';

interface AreaState {
    areas: IArea[] | [];
    error: any;
}

const areaStore: StoreBase = {
    state(): AreaState {
        return {
            areas: [],
            error: '',
        };
    },
    mutations: {
        setAreas(state: AreaState, areasPayload: IArea[]) {
            state.areas = areasPayload;
            console.log(state);
        },
        addArea(state: AreaState, areaPayload: IArea) {
            state.areas = [...state.areas, areaPayload];
        },

        setError(state: AreaState, errorPayload: any) {
            state.error = errorPayload;
        },
    },
    actions: {
        async fetchAreas(context: ActionContext<AreaState, RootState>) {
            try {
                const result = await httpRequest.get('/area');
                context.commit('setAreas', result.data.data);
            } catch (error) {
                console.log(`file: area.ts:37 > error:`, error);
                context.commit('setError', error);
            }
        },
    },

    getters: {
        areas: (state: AreaState) => state.areas,
    },
};

export default areaStore;
