<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const isTouchScreen = ref(true);
const TOUCHSCREEN_MAX_WIDTH = 1024;

function onResize() {
    isTouchScreen.value = isTouchScreen.value === window.innerWidth < TOUCHSCREEN_MAX_WIDTH;
    console.log(window.innerWidth);
}

onMounted(() => {
    window.addEventListener('resize', onResize);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize);
});
</script>

<template>
    <section class='header-background'>
        <div>
            <img alt='Information icon' src='/images/icons8-information-30.png'>
        </div>
        <div class="header-title">
            <h1>GeoQuiz</h1>
        </div>
        <div>
            <button v-if="isTouchScreen" class="hamburger-menu">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
            </button>

            <span class="overlay"></span>
            <nav v-if="!isTouchScreen">
                <ul class="menu">
                    <li class="menu-item">
                        <RouterLink to="/">Home</RouterLink>
                    </li>
                    <li class="menu-item">
                        <RouterLink to="/quiz">Quiz</RouterLink>
                    </li>
                </ul>
            </nav>
        </div>
    </section>
</template>

<style scoped>
ul {
    list-style-type: none;
}

* {
    --radius: 5px;
    --padding-button: 10px;
}

h1 {
    color: #f9f7f7;
    font-family: 'Avigea', 'serif';
    font-size: 35px;
}

.hamburger-menu {
    align-items: center;
    background: #3f72af;
    border: #f9f7f7 solid 2px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    height: 50px;
    justify-content: center;
    width: 50px;
}

.header-title {
    display: flex;
    justify-content: center;
    width: 34%;
}

.line {
    background: #f9f7f7;
    border-radius: var(--radius);
    display: block;
    height: 3px;
    margin: 3px 0;
    width: 75%;
}

.header-background {
    align-items: center;
    background: #3f72af;
    display: flex;
    flex-direction: row;
    height: 100px;
    left: 0;
    min-width: 320px;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 9;
}

.menu {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 0;
}

.menu-item a {
    color: #f9f7f7;
    display: inline-block;
    margin: 0;
    padding: var(--padding-button);
    position: relative;
    text-decoration: none;
}

.menu-item a:hover {
    background: #f9f7f7;
    color: #112d4e;
}

.menu-item:link {
    color: red;
    text-decoration: none;
}

section {
    display: flex;
    justify-content: space-evenly;
}
</style>