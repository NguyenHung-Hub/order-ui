import { ActionContext } from 'vuex';
import { RootState, StoreBase } from '../../../interfaces/store.interface';
import IUser, { IRequestLogin, IUserResponse } from '../../../interfaces/auth.interface';
import * as authService from '../../../services/auth.service';

interface AuthState {
    user: IUserResponse | null;
    isAuthenticated: boolean;
    error: any;
}

const authStore: StoreBase = {
    state(): AuthState {
        let userLocal;
        let isAuth = false;
        if (localStorage.getItem('user')) {
            userLocal = JSON.parse(localStorage.getItem('user') as string) as IUserResponse;
            console.log(`file: auth.ts:17 > userLocal:`, userLocal);
            isAuth = true;
        } else {
            userLocal = null;
        }

        return {
            user: userLocal,
            error: '',
            isAuthenticated: isAuth,
        };
    },
    mutations: {
        setUser(state: AuthState, userPayload: IUserResponse) {
            state.user = userPayload;
            state.isAuthenticated = true;
            console.log(state);
        },

        setError(state: AuthState, errorPayload: any) {
            state.error = errorPayload;
        },
    },
    actions: {
        async fetchLogin(context: ActionContext<AuthState, RootState>, data: IRequestLogin) {
            try {
                const result = await authService.login(data.email, data.password);

                context.commit('setUser', result);
            } catch (error) {
                console.log(`file: auth.ts:34 > error:`, error);
                context.commit('setError', error);
            }
        },
        setUser(context: ActionContext<AuthState, RootState>, user: IUserResponse) {
            context.commit('setUser', user);
            localStorage.setItem('user', JSON.stringify(user));
        },
    },

    getters: {
        user: (state: AuthState) => state.user,
        shopName: (state: AuthState) => state.user?.shop.name,
        shopId: (state: AuthState) => state.user?.shop._id,
        isAuthenticated: (state: AuthState) => {
            if (state.user) {
                return true;
            }
            return false;
        },
        userRole: (state: AuthState) => {
            if (state.user) {
                return state.user?.role.name;
            } else {
                return 'customer';
            }
        },
    },
};

export default authStore;
