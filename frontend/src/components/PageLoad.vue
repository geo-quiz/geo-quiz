<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const dots = ref('.');

function addDot() {
    if (dots.value.length < 3) {
        dots.value += '.';
    } else {
        dots.value = '.';
    }
}

onMounted(() => {
    setInterval(addDot, 500);
});
</script>

<template>
    <div class="wrapper">
        <div class="loader">
            <div class="blank"></div>
        </div>
        <div class="filler">
            <label class="loading-label">Loading {{ dots }}</label>
        </div>
    </div>
</template>

<style scoped>
.blank {
    position: relative;
    top: 8px;
    left: 8px;
    background: var(--color-dark-blue);
    border-radius: 50%;
    height: 80px;
    width: 80px;
    margin: 0;
}

.loader {
    background: linear-gradient(
        rgba(249, 247, 247, 50%) 0%,
        rgba(249, 247, 247, 50%) 50%,
        rgba(249, 247, 247, 50%) 75%,
        var(--color-light-green) 100%
    );
    animation: spin 2s linear infinite;
    border-radius: 50%;
    height: 96px;
    width: 96px;
    margin: 0;
}

.loading-label {
    padding-left: calc(50% - 35px);
}

.filler {
    width: 100%;
}

.wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    width: 100%;
    align-items: center;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
