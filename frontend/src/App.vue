<script lang="ts" setup>
import { onMounted, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import router from '@/router/index';
import { useRoute } from 'vue-router';
const authStore = useAuthStore();
const route = useRoute();

onMounted(checkAuthentication);

watch(
    () => route.path,
    async () => {
        checkAuthentication();
    },
);

function checkAuthentication() {
    const sessionToken = sessionStorage.getItem('token');
    const localToken = localStorage.getItem('token');
    const hrefParts = location.href.split('/');
    const url = hrefParts[hrefParts.length - 1];
    console.log('url ', { value: url });
    if (!authStore.token) {
        if (localToken) {
            authStore.setToken(localToken);
            redirectIfLoggedIn();
        } else if (sessionToken) {
            authStore.setToken(sessionToken);
            redirectIfLoggedIn();
        } else {
            if (url !== 'login' && url !== 'register') {
                router.push('/');
            }
        }
    } else {
        redirectIfLoggedIn();
    }
}

function redirectIfLoggedIn() {
    const hrefParts = location.href.split('/');
    const url = hrefParts[hrefParts.length - 1];

    if (url === 'login' || url === 'register' || url === '') {
        router.push('/home');
    }
}
</script>

<template>
    <RouterView />
</template>

<style scoped></style>
