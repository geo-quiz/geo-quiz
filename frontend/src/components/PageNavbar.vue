<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const isTouchScreen = ref(true);
const TOUCHSCREEN_MAX_WIDTH = 1024;

onMounted(() => {
    window.addEventListener('resize', onResize);
    onResize();
});

onUnmounted(() => {
    window.removeEventListener('resize', onResize);
});

function onResize() {
    isTouchScreen.value = window.innerWidth < TOUCHSCREEN_MAX_WIDTH;
}

onMounted(() => {
    window.addEventListener('resize', onResize);
    onResize();
});

onUnmounted(() => {
    window.removeEventListener('resize', onResize);
});

const authStore = useAuthStore();

function logout() {
    authStore.logout();
}
</script>

<template>
    <div v-if="isTouchScreen" class="hamburger-container">
        <input id="hamburger-toggle" aria-label="Toggle Navigation" class="checkbox" type="checkbox" />
        <label class="hamburger" for="hamburger-toggle">
            <span class="slice"></span>
            <span class="slice"></span>
            <span class="slice"></span>
        </label>
        <div class="drawer">
            <nav class="nav-list">
                <RouterLink to="/home">Home</RouterLink>
                <RouterLink to="/profile">Profile</RouterLink>
                <RouterLink to="/" @click="logout()">Log out</RouterLink>
            </nav>
        </div>
    </div>
    <div v-if="!isTouchScreen" class="navbar-container-desktop">
        <nav class="nav-list">
            <RouterLink to="/home">Home</RouterLink>
            <RouterLink to="/profile">Profile</RouterLink>
            <RouterLink to="/" @click="logout()">Log out</RouterLink>
        </nav>
    </div>
</template>

<style scoped>
.navbar-container-desktop {
    display: flex;
    justify-content: center;
    padding-right: 20px;
    width: 30%;
}

.hamburger-container {
    color: var(--color-white);
    display: flex;
    justify-content: flex-end;
    left: 0;
    top: 0;
    transition: transform 0.5s ease;
    width: 30%;
}

.hamburger-container .checkbox {
    opacity: 0;
    position: absolute;
}

.hamburger-container .checkbox:focus ~ .hamburger {
    outline: 2px solid var(--color-white);
    outline: auto;
    outline-offset: 4px;
}

.hamburger-container .drawer a {
    transition: visibility 0.5s linear;
    visibility: hidden;
}

.hamburger-container .checkbox:checked ~ .drawer a {
    visibility: visible;
}

.hamburger-container .checkbox:checked ~ .drawer {
    transform: translateX(0%);
}

.hamburger-container .checkbox:checked ~ .hamburger .slice:nth-child(1) {
    transform: translateY(12px) rotate(45deg);
}

.hamburger-container .checkbox:checked ~ .hamburger .slice:nth-child(2) {
    opacity: 0;
}

.hamburger-container .checkbox:checked ~ .hamburger .slice:nth-child(3) {
    transform: translateY(-12px) rotate(-45deg);
}

.hamburger {
    cursor: pointer;
    display: block;
    position: relative;
    transition: transform 0.5s ease;
    width: 32px;
    z-index: 1;
}

.hamburger .slice {
    background-color: var(--color-white);
    display: block;
    height: 2px;
    transition: all 0.5s ease;
    width: 100%;
}

.hamburger .slice:not(:first-child) {
    margin-top: 10px;
}

.drawer {
    align-content: flex-end;
    background: var(--color-blue);
    border-radius: 0 0 0 8px;
    max-width: 150px;
    position: fixed;
    right: 0;
    top: 100px;
    transform: translateX(105%);
    transition: transform 0.5s ease;
    width: 30%;
}

.nav-list {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: 0;
}

a {
    border-top: 2px solid var(--color-white);
    color: var(--color-white);
    padding: 12px 0;
    position: relative;
    text-align: center;
    text-decoration: none;
    width: 100%;
}

a:active {
    top: 2px;
}

a:hover {
    color: #d4d4d4;
}

@media only screen and (min-width: 1024px) {
    .nav-list {
        flex-direction: row;
        width: 100%;
    }

    .hamburger-container {
        visibility: hidden;
    }

    a {
        border-top: 0;
        padding: 4px;
    }
}
</style>
