<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

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
            <img alt='Information icon' src='/images/leftarrow.png' class="return-button">
        </div>
        <div class="logo-container">
            <h1 class="logo-text">GeoQuiz</h1>
        </div>
        <div class="hamburger-container" v-if="isTouchScreen">
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
                    <RouterLink to="/logout">Log out</RouterLink>
                </nav>
            </div>
        </div>
        <div v-if="!isTouchScreen" class="navbar-container-desktop">
            <nav class="nav-list">
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/profile">Profile</RouterLink>
                <RouterLink to="/settings">Settings</RouterLink>
                <RouterLink to="/logout">Log out</RouterLink>
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
    align-items: flex-end;
    align-content: flex-end;
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
    width: 33%;
    display: flex;
    justify-content: center;
}

.return-button {
    width: 60px;
    margin-bottom: 10px;
    background-size: contain;
}

.return-button:hover {
    background: #112d4e;
    border-radius: 90px;
}

.logo-container {
    width: 34%;
    display: flex;
    justify-content: center;
}

.logo-text {
    color: #f9f7f7;
    font-size: 3rem;
    font-family: 'Avigea', 'serif';
    font-weight: normal;
    margin: 0;
}

.navbar-container-desktop {
    width: 33%;
    display: flex;
    justify-content: center;
    padding-right: 20px;
}

.hamburger-container {
    color: #f9f7f7;
    left: 0;
    top: 0;
    transition: transform 0.5s ease;
    width: 33%;
    display: flex;
    justify-content: center;
    margin: 0 0 20px 0;
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
    background: #3f72af;
    right: 0;
    position: fixed;
    top: 100px;
    transform: translateX(105%);
    transition: transform 0.5s ease;
    width: 30%;
    align-content: flex-end;
    max-width: 150px;
    border-radius: 0 0 0 8px;
}

.nav-list {
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

a {
    color: #f9f7f7;
    border-top: 3px solid #f9f7f7;
    text-align: center;
    padding: 12px 0;
    text-decoration: none;
    width: 100%;
}

a:last-of-type {
    border-radius: 0 0 0 8px;
}

a:first-of-type {
    border: none;
}

a:hover {
    background: #424242;
    color: #f9f7f7;
    border-left: 1px solid #f9f7f7;

}

a:last-of-type:hover {
    border-bottom: 1px solid #f9f7f7;
}

@media only screen and (max-width: 400px) {
    .image-container {
        justify-content: flex-start;
        padding-left: 22px;
    }

    .hamburger-container {
        justify-content: flex-end;
        padding-right: 22px;
    }
}

@media only screen and (min-width: 1024px) {
    .nav-list {
        flex-direction: row;
        width: 100%;
        padding: 0 0 20px 0;
    }

    .hamburger-container {
        visibility: hidden;
    }

    a {
        border-bottom: 3px solid #f9f7f7;
        border-top: 0;
        padding: 4px;
    }

    a:hover {
        border-top: 1px solid #f9f7f7;
        border-left: 1px solid #f9f7f7;
        border-right: 1px solid #f9f7f7;
    }

    a:first-of-type {
        border-bottom: 3px solid #f9f7f7;
    }

    a:last-of-type {
        border-radius: 0;
    }
}

@media only screen and (min-width: 1300px) {
    .navbar-container-desktop {
        padding-right: 50px;
    }
}
</style>