import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/Register.vue'), // Lazy-loaded
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'), // Lazy-loaded
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !authStore.getAuth) {
        next({ name: 'login' });
    } else {
        next();
    }
})

export default router;
