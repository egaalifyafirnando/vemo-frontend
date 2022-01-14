//import vue router
import { createRouter, createWebHistory } from 'vue-router';

// import store vuex
import store from '@/store';

//define a routes
const routes = [
    {
        // * REGISTER
        path: '/register',
        name: 'register',
        component: () => import('@/views/auth/Register.vue'),
    },
    {
        // * LOGIN
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/Login.vue'),
    },
    {
        // * DASHBOARD
        path: '/customer/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/Index.vue'),

        // check is logged In
        meta: {
            requiresAuth: true,
        },
    },
    {
        // * ORDER
        path: '/customer/order',
        name: 'order',
        component: () => import('../views/order/Index.vue'),

        // check is logged In
        meta: {
            requiresAuth: true,
        },
    },
    {
        // * SNAP TOKEN
        path: '/customer/order/:snap_token',
        name: 'detail_order',
        component: () => import('../views/order/Show.vue'),

        // check is logged In
        meta: {
            requiresAuth: true,
        },
    },
    {
        // * HOME
        path: '/',
        name: 'home',
        component: () => import('@/views/home/Index.vue'),
    },
    {
        // * PRODUCT
        path: '/product/:slug',
        name: 'detail_product',
        component: () => import('../views/product/Show.vue'),
    },
    {
        // * CATEGORY
        path: '/categories/',
        name: 'categories',
        component: () => import('../views/category/Index.vue'),
    },
    {
        // * DETAIL CATEGORY
        path: '/category/:slug',
        name: 'detail_category',
        component: () => import('../views/category/Show.vue'),
    },
    {
        // * CART
        path: '/cart',
        name: 'cart',
        component: () => import('../views/cart/Index.vue'),
        meta: {
            //chek is loggedIn
            requiresAuth: true,
        },
    },
];

//create router
const router = createRouter({
    history: createWebHistory(),
    routes, // <-- routes
});

// define route for handle authentication
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // cek nilai dari getters isLoggedIn di module auth
        if (store.getters['auth/isLoggedIn']) {
            next();
            return;
        }
        next('/login');
    } else {
        next();
    }
});

export default router;
