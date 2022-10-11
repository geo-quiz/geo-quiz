import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/StartView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
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
