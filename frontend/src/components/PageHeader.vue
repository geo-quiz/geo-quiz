<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import ArrowLeftCircleOutlineIcon from 'vue-material-design-icons/ArrowLeftCircleOutline.vue';

const isTouchScreen = ref(true);
const TOUCHSCREEN_MAX_WIDTH = 1024;

function onResize() {
    isTouchScreen.value = window.innerWidth < TOUCHSCREEN_MAX_WIDTH;
    console.log(window.innerWidth);
}


onMounted(() => {
    window.addEventListener('resize', onResize);
    onResize();
});

onUnmounted(() => {
    window.removeEventListener('resize', onResize);
});
</script>

<template>
    <section class='header-background'>
        <div class="image-container">
            <ArrowLeftCircleOutlineIcon :size="48" class="return-button" fillColor="#f9f7f7" @click="$router.back()" />
        </div>
        <div class="logo-container">
            <h1 class="logo-text">GeoQuiz</h1>
        </div>
        <div v-if="isTouchScreen" class="hamburger-container">
            <input id="hamburger-toggle" aria-label="Toggle Navigation" class="checkbox" type="checkbox" />
            <label class="hamburger" for="hamburger-toggle">
                <span class="slice"></span>
                <span class="slice"></span>
                <span class="slice"></span>
            </label>
            <div class="drawer">
                <nav class="nav-list">
                    <RouterLink to="/">Home</RouterLink>
                    <RouterLink to="/profile">Profile</RouterLink>
                    <RouterLink to="/settings">Settings</RouterLink>
                </nav>
            </div>
        </div>
        <div v-if="!isTouchScreen" class="navbar-container-desktop">
            <nav class="nav-list">
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/profile">Profile</RouterLink>
                <RouterLink to="/settings">Settings</RouterLink>
            </nav>
        </div>
    </section>
</template>

<style scoped>
section {
    display: flex;
    justify-content: space-evenly;
}

.header-background {
    align-content: flex-end;
    align-items: center;
    background: #3f72af;
    display: flex;
    flex-direction: row;
    height: 100px;
    left: 0;
    min-width: 360px;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 9;
}

.image-container {
    display: flex;
    justify-content: flex-start;
    padding: 0 0 0 20px;
    width: 33%;
}

.return-button {
    cursor: pointer;
    height: 48px;
    width: 48px;
    position: relative;
}

.return-button:active {
    top: 2px;
}

.logo-container {
    display: flex;
    justify-content: center;
    width: 34%;
}

.logo-text {
    color: #f9f7f7;
    font-family: 'Avigea', 'serif';
    font-size: 3rem;
    font-weight: normal;
    margin: 0;
}

.navbar-container-desktop {
    display: flex;
    justify-content: center;
    padding-right: 20px;
    width: 33%;
}

.hamburger-container {
    color: #f9f7f7;
    display: flex;
    justify-content: flex-end;
    left: 0;
    padding: 0 30px 0 0;
    top: 0;
    transition: transform 0.5s ease;
    width: 33%;
}

.hamburger-container .checkbox {
    opacity: 0;
    position: absolute;
}

.hamburger-container .checkbox:focus ~ .hamburger {
    outline: 2px solid #f9f7f7;
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
    background-color: #f9f7f7;
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
    background: #3f72af;
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
    border-top: 2px solid #f9f7f7;
    color: #f9f7f7;
    padding: 12px 0;
    text-align: center;
    text-decoration: none;
    width: 100%;
    position:relative;
}

a:active {
    top: 2px;
}

a:hover {
    color: #D4D4D4;
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

@media only screen and (min-width: 1300px) {
    .navbar-container-desktop {
        padding-right: 50px;
    }
}
</style>