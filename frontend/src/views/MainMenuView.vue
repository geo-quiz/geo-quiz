<script lang="ts" setup>
import GeoButton from '@/components/GeoButton.vue';
import PageFooter from '@/components/PageFooter.vue';
import router from '@/router';
import MainMenuContainer from '@/components/MainMenuContainer.vue';
</script>

<template>
    <MainMenuContainer>
        <div class="wrapper">
            <GeoButton color="green" size="large" @click="router.push('/quiz')"> Play now</GeoButton>
            <div class="buttons">
                <div class="button-wrapper">
                    <GeoButton @click="router.push('/profile')">Profile</GeoButton>
                </div>
                <div class="button-wrapper">
                    <GeoButton @click="router.push('/leaderboard')">Leaderboard</GeoButton>
                </div>
                <div class="button-wrapper">
                    <GeoButton @click="router.push('/settings')">Settings</GeoButton>
                </div>
                <div class="button-wrapper">
                    <GeoButton @click="router.push('/')">Log out</GeoButton>
                </div>
            </div>
        </div>
    </MainMenuContainer>
    <PageFooter />
</template>

<style scoped>
.buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);
    justify-content: space-between;
    width: 100%;
}

.button-wrapper {
    width: calc(50% - var(--gap) / 2);
}

.wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    width: 100%;
}
</style>
