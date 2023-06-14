import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import DefaultLayout from './layouts/DefaultLayout.vue';
import EmptyLayout from './layouts/EmptyLayout.vue';
import OnlyFooterLayout from './layouts/OnlyFooterLayout.vue';
import HomePage from './pages/HomePage.vue';
import CategoryPage from './pages/CategoryPage.vue';
import CartPage from './pages/CartPage.vue';
import UserPage from './pages/UserPage.vue';
import QrPage from './pages/QrPage.vue';
import CreateAccount from './pages/CreateAccount.vue';
import ProductDetailPage from './pages/ProductDetailPage.vue';
import DiningTablePage from './pages/DiningTablePage.vue';
import FoodPage from './pages/FoodPage.vue';
import CreateFoodPage from './pages/CreateFoodPage.vue';
import LoginPage from './pages/LoginPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import OrderHistoryPage from './pages/OrderHistoryPage.vue';
import WaiterPage from './pages/WaiterPage.vue';
import ChefPage from './pages/ChefPage.vue';

import store from './store';

export const routesName = {
    HomePage: 'HomePage',
    CategoryPage: 'CategoryPage',
    CartPage: 'CartPage',
    UserPage: 'UserPage',
    QrPage: 'QrPage',
    CreateAccount: 'CreateAccount',
    ProductDetailPage: 'ProductDetailPage',
    DiningTablePage: 'DiningTablePage',
    FoodPage: 'FoodPage',
    CreateFoodPage: 'CreateFoodPage',
    LoginPage: 'LoginPage',
    RegisterPage: 'RegisterPage',
    OrderHistoryPage: 'OrderHistoryPage',
    WaiterPage: 'WaiterPage',
    ChefPage: 'ChefPage',
};

const shopName = store.getters['shopName'];
const pathRoot = `/${shopName}`;
const routes: RouteRecordRaw[] = [
    {
        path: '/:shop',
        name: 'Root',
        children: [
            {
                path: '',
                name: 'DefaultLayout',
                component: DefaultLayout,
                children: [
                    {
                        path: '',
                        name: routesName.HomePage,
                        component: () => import('./pages/HomePage.vue'),
                    },
                ],
            },
            {
                path: '',
                name: 'CategoryDefaultLayout',
                component: DefaultLayout,
                children: [
                    {
                        path: `category/:slug`,
                        name: routesName.CategoryPage,
                        component: CategoryPage,
                        meta: { requiresAuth: true },
                    },
                ],
            },
            {
                path: '',
                name: 'CartEmptyLayout',
                component: EmptyLayout,
                children: [
                    {
                        path: 'cart',
                        name: routesName.CartPage,
                        component: CartPage,
                        meta: { requiresAuth: false },
                    },
                ],
            },
            {
                path: '',
                name: 'OnlyFooterLayout',
                component: OnlyFooterLayout,
                children: [
                    {
                        path: 'user',
                        name: routesName.UserPage,
                        component: UserPage,
                        meta: { requiresAuth: true },
                    },
                ],
            },
            {
                path: '',
                name: 'QrOnlyFooterLayout',
                component: OnlyFooterLayout,
                children: [
                    {
                        path: 'qr',
                        name: routesName.QrPage,
                        component: QrPage,
                        meta: { requiresAuth: true },
                    },
                ],
            },
            {
                path: '',
                name: 'AccountOnlyFooterLayout',
                component: OnlyFooterLayout,
                children: [
                    {
                        path: 'account',
                        name: routesName.CreateAccount,
                        component: CreateAccount,
                        meta: { requiresAuth: true },
                    },
                ],
            },
            {
                path: '',
                name: 'EmptyLayout',
                component: EmptyLayout,
                children: [
                    {
                        path: 'detail',
                        name: routesName.ProductDetailPage,
                        component: ProductDetailPage,
                        meta: { requiresAuth: false },
                    },
                ],
            },
            {
                path: '',
                name: 'TableEmptyLayout',
                component: EmptyLayout,
                children: [
                    {
                        path: 'table',
                        name: routesName.DiningTablePage,
                        component: DiningTablePage,
                        meta: { requiresAuth: true },
                    },
                ],
            },
            {
                path: '',
                name: 'FoodEmptyLayout',
                component: EmptyLayout,
                children: [
                    {
                        path: 'food',
                        name: routesName.FoodPage,
                        component: FoodPage,
                        meta: { requiresAuth: true },
                    },
                    {
                        path: 'create',
                        name: routesName.CreateFoodPage,
                        component: CreateFoodPage,
                        meta: { requiresAuth: true },
                    },
                ],
            },
            {
                path: '',
                name: 'RegisterEmptyLayout',
                component: EmptyLayout,

                children: [
                    {
                        path: 'register',
                        name: routesName.RegisterPage,
                        component: RegisterPage,
                        meta: { requiresAuth: false },
                    },
                ],
            },
            {
                path: '',
                name: 'HistoryEmptyLayout',
                component: EmptyLayout,
                children: [
                    {
                        path: 'history',
                        name: routesName.OrderHistoryPage,
                        component: OrderHistoryPage,
                        meta: { requiresAuth: true },
                    },
                ],
            },
            {
                path: '',
                name: 'WaiterOnlyFooterLayout',
                component: OnlyFooterLayout,
                children: [
                    {
                        path: 'waiter',
                        name: routesName.WaiterPage,
                        component: WaiterPage,
                        meta: { requiresAuth: true },
                    },
                ],
            },
            {
                path: '',
                name: 'ChefOnlyFooterLayout',
                component: OnlyFooterLayout,
                children: [
                    {
                        path: 'chef',
                        name: routesName.ChefPage,
                        component: ChefPage,
                        meta: { requiresAuth: true },
                    },
                ],
            },
        ],
    },
    {
        path: '',
        name: 'LoginEmptyLayout',
        component: EmptyLayout,

        children: [
            {
                path: '/login',
                name: routesName.LoginPage,
                component: LoginPage,
                meta: { requiresAuth: false },
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'link-active',
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters['isAuthenticated'];

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (isAuthenticated) {
            next();
        } else {
            next('/login');
        }
    } else {
        next();
    }
});

export default router;
