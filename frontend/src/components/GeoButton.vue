<script lang="ts" setup>
defineProps({
    fontSize: { type: String, default: '1rem' },
    width: { type: String, default: '50%' },
    height: { type: String, default: '40px' }
});
</script>

<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<style scoped>
.button {
    background: #3f72af;
    border: none;
    border-radius: var(--radius);
    color: #f9f7f7;
    font-size: v-bind(fontSize);
    height: v-bind(height);
    padding: 3px 6px;
    width: calc(v-bind(width) - var(--gap) / 2);
}
</style>
