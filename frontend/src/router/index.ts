import { createRouter, createWebHistory } from 'vue-router';
import LandingPageView from '@/views/LandingPageView.vue';
import MainManuView from '@/views/MainMenuView.vue';
import QuizView from '@/views/QuizView.vue';
import ResultView from '@/views/ResultView.vue';
import LoginView from '@/views/LoginView.vue';
import ContinentView from '@/views/ContinentView.vue';
import ProfileView from '@/views/ProfileView.vue';
import RegisterView from '@/views/RegisterView.vue';
import ForgotPasswordView from '@/views/ForgotPasswordView.vue';
import LeaderboardView from '@/views/LeaderboardView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'landing-page',
            component: LandingPageView,
        },
        {
            path: '/home',
            name: 'main-menu',
            component: MainManuView,
        },
        {
            path: '/result',
            name: 'result',
            component: ResultView,
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
        {
            path: '/leaderboard/:continent',
            name: 'leaderboard',
            component: LeaderboardView,
        },
    ],
});

export default router;
