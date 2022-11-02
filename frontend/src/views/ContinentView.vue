<script lang="ts" setup>
import PageHeader from '@/components/PageHeader.vue';
import ContinentMap from '@/components/ContinentMap.vue';
import ContinentViewMobile from '@/views/ContinentViewMobile.vue';
import PageFooter from '@/components/PageFooter.vue';
import { isMobileOnly } from 'mobile-device-detect';
</script>

<template>
    <PageHeader />
    <ContinentViewMobile v-if="isMobileOnly" />
    <ContinentMap v-else />
    <PageFooter />
</template>

<style scoped></style>
