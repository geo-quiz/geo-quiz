<script lang="ts" setup>
import ContinentMapMobile from '@/components/ContinentMapMobile.vue';
import ContinentMapMobileLeft from '@/components/ContinentMapMobileLeft.vue';
import ContinentMapMobileRight from '@/components/ContinentMapMobileRight.vue';
import { ref } from 'vue';

const page = ref('middle');
</script>

<template>
    <ContinentMapMobileLeft v-if="page === 'left'" @goTo="(v) => (page = v)" />
    <ContinentMapMobileRight v-else-if="page === 'right'" @goTo="(v) => (page = v)" />
    <ContinentMapMobile v-else @goTo="(v) => (page = v)" />
</template>

<style scoped></style>
