import { createRouter, createWebHistory } from 'vue-router';
import StartView from '@/views/StartView.vue';
import HomeView from '@/views/HomeView.vue';
import QuizView from '@/views/QuizView.vue';
import NextView from '@/views/NextView.vue';
import LoginView from '@/views/LoginView.vue';
import ContinentView from '@/views/ContinentView.vue';
import ProfileView from '@/views/ProfileView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'start',
            component: StartView,
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/quiz',
            name: 'quiz',
            component: QuizView,
        },
        {
            path: '/next',
            name: 'next',
            component: NextView,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/continent',
            name: 'continent',
            component: ContinentView,
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView,
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/RegisterView.vue'),
        },
    ],
});

export default router;
