<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import router from '@/router/index';

const isTouchScreen = ref(true);
const TOUCHSCREEN_MAX_WIDTH = 1024;
const isLoggedIn = ref(false);
const authStore = useAuthStore();
const loginOrLogout = ref('Logout');
const isRouteLoginOrRegister = ref(false);
const checked = ref(false);

onMounted(() => {
    checked.value = false;
    window.addEventListener('resize', onResize);
    onResize();
    if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
        isLoggedIn.value = true;
    }
    checkIfRouteIsLoginOrRegister();
});

onUnmounted(() => {
    checked.value = false;
    window.removeEventListener('resize', onResize);
});

function onResize() {
    isTouchScreen.value = window.innerWidth < TOUCHSCREEN_MAX_WIDTH;
}

function logout() {
    if (loginOrLogout.value === 'Logout') {
        authStore.logout();
    } else {
        router.push('/login');
    }
}

function checkIfRouteIsLoginOrRegister() {
    const hrefParts = location.href.split('/');
    const url = hrefParts[hrefParts.length - 1];
    if (url === 'login' || url === 'register') isRouteLoginOrRegister.value = true;
}
</script>

<template>
    <div v-if="isTouchScreen && !isRouteLoginOrRegister" class="hamburger-container">
        <input
            id="hamburger-toggle"
            aria-label="Toggle Navigation"
            class="checkbox"
            type="checkbox"
            v-model="checked" />
        <label class="hamburger" for="hamburger-toggle">
            <span class="slice"></span>
            <span class="slice"></span>
            <span class="slice"></span>
        </label>
        <div class="drawer">
            <nav class="nav-list">
                <RouterLink to="/home">Home</RouterLink>
                <RouterLink to="/profile">Profile</RouterLink>
                <RouterLink to="/" @click="logout()">{{ loginOrLogout }}</RouterLink>
            </nav>
        </div>
    </div>
    <div v-else-if="isTouchScreen && isRouteLoginOrRegister" class="empty-div"></div>
    <div v-else-if="!isTouchScreen && !isRouteLoginOrRegister" class="navbar-container-desktop">
        <nav class="nav-list">
            <RouterLink to="/home">Home</RouterLink>
            <RouterLink to="/profile">Profile</RouterLink>
            <RouterLink to="/" @click="logout()">{{ loginOrLogout }}</RouterLink>
        </nav>
    </div>
    <div v-else class="empty-div"></div>
</template>

<style scoped>
.empty-div {
    width: 30%;
}

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
