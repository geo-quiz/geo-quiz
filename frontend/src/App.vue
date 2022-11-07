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
    const token = authStore.getToken();

    const hrefParts = location.href.split('/');
    const url = hrefParts[hrefParts.length - 1];
    if (token) {
        fetch('http://localhost:3000/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        })
            .then((res) => {
                if (res.ok) {
                    res.json().then((data) => {
                        authStore.setDisplayName(data.displayName);
                        authStore.setProfilePicture(data.profilePicture);
                        let participation = true;
                        if (data.leaderboardParticipation == '0') {
                            participation = false;
                        }
                        authStore.setParticipation(participation);
                    });
                } else {
                    authStore.clearToken();
                }
            })
            .catch((err) => {
                console.error(err);
                authStore.clearToken();
            });
        redirectIfLoggedIn();
    } else {
        if (url !== 'login' && url !== 'register') {
            router.push('/');
        }
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
