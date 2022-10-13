<script lang="ts" setup>
import router from '@/router/index';
import MainMenuContainer from '@/components/MainMenuContainer.vue';
import GeoButton from '@/components/GeoButton.vue';</script>

<template>
    <MainMenuContainer>
        <div class="buttonContainer">
            <GeoButton size="large" color="green" id="login-button" height="75px" width="400px"
                       @click="router.push('/login')">Sign in
            </GeoButton>
            <GeoButton height="75px" width="400px" @click="router.push('/register')">Register</GeoButton>
        </div>
    </MainMenuContainer>
</template>

<style scoped>
.buttonContainer {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    width: 100%;
}
</style>
