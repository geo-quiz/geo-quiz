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
        <div class="wrapper">
            <slot></slot>
        </div>
    </main>
</template>

<style scoped>
.background {
    background: url('/images/background.png');
    background-size: cover;
    min-height: 100vh;
    position: absolute;
    width: 100%;
    z-index: -10;
}

main {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 100px;
    width: 100%;
}

.wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    width: 100%;
}
</style>
