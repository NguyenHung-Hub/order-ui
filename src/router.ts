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

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'DefaultLayout',
        component: DefaultLayout,
        children: [
            {
                path: '/',
                name: 'HomePage',
                component: HomePage,
            },
        ],
    },
    {
        path: '/',
        name: 'CategoryDefaultLayout',
        component: DefaultLayout,
        children: [
            {
                path: '/category/:slug',
                name: 'CategoryPage',
                component: CategoryPage,
            },
        ],
    },
    {
        path: '/',
        name: 'CartEmptyLayout',
        component: EmptyLayout,
        children: [
            {
                path: '/cart',
                name: 'CartPage',
                component: CartPage,
            },
        ],
    },
    {
        path: '/',
        name: 'OnlyFooterLayout',
        component: OnlyFooterLayout,
        children: [
            {
                path: '/user',
                name: 'UserPage',
                component: UserPage,
            },
        ],
    },
    {
        path: '/',
        name: 'QrOnlyFooterLayout',
        component: OnlyFooterLayout,
        children: [
            {
                path: '/qr',
                name: 'QrPage',
                component: QrPage,
            },
        ],
    },
    {
        path: '/',
        name: 'AccountOnlyFooterLayout',
        component: OnlyFooterLayout,
        children: [
            {
                path: '/account',
                name: 'CreateAccount',
                component: CreateAccount,
            },
        ],
    },

    {
        path: '/',
        name: 'EmptyLayout',
        component: EmptyLayout,

        children: [
            {
                path: 'detail',
                name: 'ProductDetailPage',
                component: ProductDetailPage,
            },
        ],
    },
    {
        path: '/',
        name: 'TableEmptyLayout',
        component: EmptyLayout,
        children: [
            {
                path: '/table',
                name: 'DiningTablePage',
                component: DiningTablePage,
            },
        ],
    },
    {
        path: '/food',
        name: 'FoodEmptyLayout',
        component: EmptyLayout,
        children: [
            {
                path: '',
                name: 'FoodPage',
                component: FoodPage,
            },
            {
                path: 'create',
                name: 'CreateFoodPage',
                component: CreateFoodPage,
            },
        ],
    },

    {
        path: '/',
        name: 'LoginEmptyLayout',
        component: EmptyLayout,

        children: [
            {
                path: '/login',
                name: 'LoginPage',
                component: LoginPage,
            },
        ],
    },
    {
        path: '/',
        name: 'RegisterEmptyLayout',
        component: EmptyLayout,

        children: [
            {
                path: '/register',
                name: 'RegisterPage',
                component: RegisterPage,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'link-active',
});

export default router;
