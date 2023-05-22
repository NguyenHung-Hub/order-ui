import { ActionContext } from 'vuex';
import { IProduct, IProductsByCategories } from '../../../interfaces/product.interface';
import { RootState, StoreBase } from '../../../interfaces/store.interface';
import httpRequest from '../../../utils/httpRequest';
import * as productService from '../../../services/product.service';
interface ProductState {
    products: IProduct[] | [];
    prodByCate: IProductsByCategories[] | [];
    error: any;
}

const productStore: StoreBase = {
    state(): ProductState {
        return {
            products: [],
            prodByCate: [],
            error: null,
        };
    },
    mutations: {
        setProducts(state: ProductState, productPayload: IProduct[]) {
            state.products = productPayload;
            console.log(state);
        },
        addProduct(state: ProductState, productPayload: IProduct) {
            state.products = [...state.products, productPayload];
        },

        setProdByCate(state: ProductState, prodByCatePayload: IProductsByCategories[]) {
            state.prodByCate = prodByCatePayload;
            console.log(state);
        },

        addProdByCate(state: ProductState, prodByCatePayload: IProductsByCategories) {
            state.prodByCate = [...state.prodByCate, prodByCatePayload];
        },

        setError(state: ProductState, errorPayload: any) {
            state.error = errorPayload;
        },
    },
    actions: {
        async fetchProducts(context: ActionContext<ProductState, RootState>, shopId: string) {
            try {
                const result = await productService.getByCategories(shopId, 5);
                context.commit('setProdByCate', result);
            } catch (error) {
                console.log(error);
                context.commit('setError', error);
            }
        },
    },

    getters: {
        prodByCate: (state: ProductState) => state.prodByCate,
    },
};

export default productStore;
