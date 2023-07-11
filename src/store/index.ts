import { createStore } from 'vuex';
import authStore, { AuthState } from './module/auth/auth';
import productStore, { ProductState } from './module/product/product';
import categoryStore, { CategoryState } from './module/category/category';
import areaStore, { AreaState } from './module/area/area';
import cartStore, { CartState } from './module/cart/cart';
import invoiceStore, { InvoicesState } from './module/invoice/invoice';
import notificationStore, { NotificationState } from './module/notification/notification';

interface State {
    auth: AuthState;
    products: ProductState;
    category: CategoryState;
    area: AreaState;
    cart: CartState;
    invoice: InvoicesState;
    notification: NotificationState;
}

const store = createStore<State>({
    modules: {
        auth: authStore,
        products: productStore,
        category: categoryStore,
        area: areaStore,
        cart: cartStore,
        invoice: invoiceStore,
        notification: notificationStore,
    },
});

store.subscribe((mutation: any, state: any) => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
});

export default store;
