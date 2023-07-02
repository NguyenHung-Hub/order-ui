import { createStore } from 'vuex';
import authStore from './module/auth/auth';
import productStore from './module/product/product';
import categoryStore from './module/category/category';
import areaStore from './module/area/area';
import cartStore from './module/cart/cart';
import invoiceStore from './module/invoice/invoice';
import notificationStore from './module/notification/notification';

const store = createStore({
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

export default store;
