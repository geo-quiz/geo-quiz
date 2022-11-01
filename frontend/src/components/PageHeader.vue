<script lang="ts" setup>
import PageNavbar from '@/components/PageNavbar.vue';
import ArrowLeftCircleOutlineIcon from 'vue-material-design-icons/ArrowLeftCircleOutline.vue';</script>

<template>
    <header class="header-background">
        <div class="image-container">
            <ArrowLeftCircleOutlineIcon
                :size="48"
                class="return-button"
                fillColor="var(--color-white)"
                @click="$router.back()" />
        </div>
        <div class="logo-container">
            <h1>
                <RouterLink class="logo-text" to="/home">GeoQuiz</RouterLink>
            </h1>
        </div>
        <PageNavbar />
    </header>
</template>

<style scoped>
header {
    display: flex;
    justify-content: space-evenly;
    min-width: 350px;
    z-index: 1000;
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

.header-background {
    align-items: center;
    background: var(--color-blue);
    display: flex;
    flex-direction: row;
    height: 100px;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
}

.image-container {
    display: flex;
    justify-content: flex-start;
    width: 30%;
}

.return-button {
    cursor: pointer;
    height: 48px;
    position: relative;
    width: 48px;
}

.return-button:active {
    top: 2px;
}

.logo-container {
    display: flex;
    justify-content: center;
    width: 30%;
}

.logo-text {
    border: none;
    color: var(--color-white);
    font-family: 'Avigea', 'serif';
    font-size: 3rem;
    font-weight: normal;
    margin: 0;
}
</style>
