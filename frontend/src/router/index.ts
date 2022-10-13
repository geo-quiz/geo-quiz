import { createRouter, createWebHistory } from 'vue-router';
import StartView from '../views/StartView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: StartView,
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
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue'),
        },
    ],
});

export default router;
