import { createRouter, createWebHistory } from 'vue-router';
import StartView from '@/views/StartView.vue';
import HomeView from '@/views/HomeView.vue';
import QuizView from '@/views/QuizView.vue';
import NextView from '@/views/NextView.vue';
import LoginView from '@/views/LoginView.vue';
import ContinentView from '@/views/ContinentView.vue';
import ProfileView from '@/views/ProfileView.vue';
import RegisterView from '@/views/RegisterView.vue';
import ForgotPasswordView from '@/views/ForgotPasswordView.vue';

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
            path: '/result',
            name: 'result',
            component: NextView,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/quiz',
            name: 'continent',
            component: ContinentView,
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView,
        },
        {
            path: '/quiz/:id',
            name: 'quiz-question',
            props: true,
            component: QuizView,
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
        },
        {
            path: '/forgot-password',
            name: 'forgot-password',
            component: ForgotPasswordView,
        },
    ],
});

export default router;
