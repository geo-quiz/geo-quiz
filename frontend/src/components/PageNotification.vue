<script lang="ts" setup></script>

<template>
    <div class="background">
        <slot></slot>
    </div>
</template>

<style scoped>
.background {
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 10;
}
</style>
