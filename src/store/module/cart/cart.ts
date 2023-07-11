import { ActionContext } from 'vuex';
import { ICart, ICartItem } from '../../../interfaces/cart.interface';
import { RootState, StoreBase } from '../../../interfaces/store.interface';
import httpRequest from '../../../utils/httpRequest';

export interface CartState {
    cart: ICart;
    error: any;
}

const cartStore: StoreBase = {
    state(): CartState {
        let cartLocal;
        if (localStorage.getItem('cart')) {
            cartLocal = JSON.parse(localStorage.getItem('cart') as string) as CartState;
            return {
                cart: cartLocal.cart,
                error: '',
            };
        }
        return {
            cart: {
                items: [],
            },
            error: '',
        };
    },
    mutations: {
        initCartStore(state: CartState) {},
        setCart(state: CartState, cartPayload: ICart) {
            state.cart = cartPayload;
            console.log(state);
        },
        addCartItem(state: CartState, itemPayload: ICartItem) {
            const findItem = state.cart.items.find((item) => item.product._id == itemPayload.product._id);

            if (findItem) {
                state.cart.items = state.cart.items.map((item): ICartItem => {
                    if (item.product._id == itemPayload.product._id) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return { ...item };
                });
            } else {
                state.cart.items.push(itemPayload);
            }
        },
        removeCartItem(state: CartState, itemPayload: ICartItem) {
            state.cart.items = state.cart.items.filter((item) => item.product._id !== itemPayload.product._id);
        },

        setError(state: CartState, errorPayload: any) {
            state.error = errorPayload;
        },

        updateQuantity(state: CartState, itemPayload: ICartItem) {
            const findItem = state.cart.items.find((item) => item.product._id == itemPayload.product._id);

            if (findItem) {
                state.cart.items = state.cart.items.map((item): ICartItem => {
                    if (item.product._id == itemPayload.product._id) {
                        return { ...item, quantity: itemPayload.quantity };
                    }
                    return { ...item };
                });
            } else {
                state.cart.items.push(itemPayload);
            }
        },
        clearCart(state: CartState) {
            state.cart.items = [];
        },
    },
    actions: {
        async fetchCategories(context: ActionContext<CartState, RootState>) {
            try {
                const result = await httpRequest.get('/category');
                context.commit('setCategories', result.data.data);
            } catch (error) {
                console.log(`file: category.ts:35 > error:`, error);
                context.commit('setError', error);
            }
        },

        addCartItem(context: ActionContext<CartState, RootState>, item: ICartItem) {
            context.commit('addCartItem', item);
        },
        removeCartItem(context: ActionContext<CartState, RootState>, item: ICartItem) {
            context.commit('removeCartItem', item);
        },

        updateQuantity(context: ActionContext<CartState, RootState>, item: ICartItem) {
            context.commit('updateQuantity', item);
        },

        clearCart(context: ActionContext<CartState, RootState>) {
            context.commit('clearCart');
        },
    },

    getters: {
        cart: (state: CartState) => state.cart,
        cartItems: (state: CartState) => state.cart.items,
        countCartItem: (state: CartState) => {
            if (state.cart.items?.length > 0) {
                return state.cart.items.reduce((acc, curr) => acc + curr.quantity, 0);
            } else {
                return 0;
            }
        },
        invoicePrice: (state: CartState) => {
            if (state.cart.items?.length > 0) {
                return state.cart.items.reduce((acc, curr) => acc + curr.quantity * curr.product.priceSale, 0);
            } else {
                return 0;
            }
        },
    },
};

export default cartStore;
