<script lang="ts" setup>
import PageFooter from '@/components/PageFooter.vue';
import MainMenuContainer from '@/components/MainMenuContainer.vue';
import GeoButton from '@/components/GeoButton.vue';
import router from '@/router/index';
</script>

<template>
    <MainMenuContainer>
        <div class="buttonContainer">
            <GeoButton
                id="login-button"
                color="green"
                height="75px"
                size="large"
                width="400px"
                @click="router.push('/login')"
                >Sign in
            </GeoButton>
            <GeoButton height="75px" width="400px" @click="router.push('/register')">Register</GeoButton>
        </div>
        <PageFooter />
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
