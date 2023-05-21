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

import store from './store';

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
                meta: { requiresAuth: true },
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
                meta: { requiresAuth: false },
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
                meta: { requiresAuth: true },
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
                meta: { requiresAuth: true },
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
                meta: { requiresAuth: true },
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
                meta: { requiresAuth: false },
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
                meta: { requiresAuth: true },
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
                meta: { requiresAuth: true },
            },
            {
                path: 'create',
                name: 'CreateFoodPage',
                component: CreateFoodPage,
                meta: { requiresAuth: true },
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
                meta: { requiresAuth: false },
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
                meta: { requiresAuth: false },
            },
        ],
    },
    {
        path: '/',
        name: 'HistoryEmptyLayout',
        component: EmptyLayout,
        children: [
            {
                path: '/history',
                name: 'OrderHistoryPage',
                component: OrderHistoryPage,
                meta: { requiresAuth: true },
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
    console.log(`file: router.ts:179 > isAuthenticated:`, isAuthenticated);

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
