import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'start',
            component: () => import('../views/StartView.vue'),
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
        },
        {
            path: '/quiz',
            name: 'quiz',
            component: () => import('../views/QuizView.vue'),
        },
        {
            path: '/next',
            name: 'next',
            component: () => import('../views/NextView.vue'),
        },
    ],
});

export default router;
