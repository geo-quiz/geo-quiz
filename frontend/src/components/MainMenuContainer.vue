<script lang="ts" setup>
import GeoLogo from '@/components/GeoLogo.vue';

defineProps({
    noLogo: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <div class="background"></div>
    <main>
        <GeoLogo v-if="!noLogo" />

        <slot></slot>
    </main>
</template>

<style scoped>
.background {
    background: url('/images/background.png');
    background-size: cover;
    z-index: -10;
    position: absolute;
    width: 100%;
    min-height: 100vh;
}

main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 100px;
}
</style>
