import { ActionContext } from 'vuex';
import { RootState, StoreBase } from '../../../interfaces/store.interface';
import { IInvoiceResponse } from '../../../interfaces/invoice.interface';
import * as invoiceService from '../../../services/invoice.service';

interface OrdersState {
    orders: Array<IInvoiceResponse> | [];
    error: any;
}

const productStore: StoreBase = {
    state(): OrdersState {
        return {
            orders: [],
            error: null,
        };
    },
    mutations: {
        setOrders(state: OrdersState, ordersPayload: IInvoiceResponse[]) {
            state.orders = ordersPayload;
        },
        addOrder(state: OrdersState, orderPayload: IInvoiceResponse) {
            state.orders = [orderPayload, ...state.orders];
        },

        setError(state: OrdersState, errorPayload: any) {
            state.error = errorPayload;
        },
    },
    actions: {
        async fetchOrders(context: ActionContext<OrdersState, RootState>, shopId: string) {
            try {
                const result = await invoiceService.getByShop(shopId);
                context.commit('setOrders', result);
            } catch (error) {
                console.log(`file: orders.ts:36 > error:`, error);
            }
        },
        addOrder(context: ActionContext<OrdersState, RootState>, invoice: IInvoiceResponse) {
            context.commit('addOrder', invoice);
        },
    },

    getters: {
        orders: (state: OrdersState) => state.orders,
    },
};

export default productStore;
