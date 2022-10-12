<script lang="ts" setup>
import GeoButton from '@/components/GeoButton.vue';
import GeoLogo from '@/components/GeoLogo.vue';
import router from '@/router';

function goTo(location: string) {
    router.push(location);
}
</script>

<template>
    <main>
        <GeoLogo />

        <div class="wrapper">
            <GeoButton id="play-button" font-size="2rem" height="120px" width="90% + 4px" @click="goTo('/quiz')">
                Play now
            </GeoButton>
            <div class="buttons">
                <GeoButton height="75px" @click="goTo('/profile')">Profile</GeoButton>
                <GeoButton height="75px" @click="goTo('/leaderboard')">Leaderboard</GeoButton>
                <GeoButton height="75px" @click="goTo('/settings')">Settings</GeoButton>
                <GeoButton height="75px" @click="goTo('/log-out')">Log out</GeoButton>
            </div>
        </div>
    </main>
</template>

<style scoped>
.buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);
    justify-content: space-between;
    width: 90%;
}

main {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 100px;
}

#play-button {
    background: #5bb318;
}

.wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: var(--gap);
}
</style>
