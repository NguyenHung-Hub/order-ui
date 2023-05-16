import { createStore } from 'vuex';
import productStore from './module/product/product';
import categoryStore from './module/category/category';
import areaStore from './module/area/area';
import cartStore from './module/cart/cart';

const store = createStore({
    modules: {
        products: productStore,
        category: categoryStore,
        area: areaStore,
        cart: cartStore,
    },
});

export default store;
