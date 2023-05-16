import { ActionContext } from 'vuex';
import { ICategory } from '../../../interfaces/category.interface';
import { RootState, StoreBase } from '../../../interfaces/store.interface';
import httpRequest from '../../../utils/httpRequest';

interface CategoryState {
    categories: ICategory[] | [];
    error: any;
}

const categoryStore: StoreBase = {
    state(): CategoryState {
        return {
            categories: [],
            error: '',
        };
    },
    mutations: {
        setCategories(state: CategoryState, categoriesPayload: ICategory[]) {
            state.categories = categoriesPayload;
            console.log(state);
        },
        addCategory(state: CategoryState, categoryPayload: ICategory) {
            state.categories = [...state.categories, categoryPayload];
        },

        setError(state: CategoryState, errorPayload: any) {
            state.error = errorPayload;
        },
    },
    actions: {
        async fetchCategories(context: ActionContext<CategoryState, RootState>) {
            try {
                const result = await httpRequest.get('/category');
                context.commit('setCategories', result.data.data);
            } catch (error) {
                console.log(`file: category.ts:35 > error:`, error);
                context.commit('setError', error);
            }
        },
    },

    getters: {
        categories: (state: CategoryState) => state.categories,
    },
};

export default categoryStore;
