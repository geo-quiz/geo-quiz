<script lang="ts" setup>
import GeoButton from '@/components/GeoButton.vue';</script>

<template>
    <main>
        <GeoButton font-size="2.5rem" width="90% + 10px" height="120px" id="play-button">Spela</GeoButton>
        <div class="buttons">
            <GeoButton height="70px">Inställningar</GeoButton>
            <GeoButton height="70px">Leaderboard</GeoButton>
            <GeoButton height="70px">Profil</GeoButton>
            <GeoButton height="70px">Logga ut</GeoButton>
        </div>
    </main>
</template>

<style scoped>

.buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
    width: 90%;
}

main {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

#play-button {
    background: #5bb318;
}
</style>
