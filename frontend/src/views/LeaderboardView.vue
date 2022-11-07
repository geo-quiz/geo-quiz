<script lang="ts" setup>
import PageHeader from '@/components/PageHeader.vue';
import PageFooter from '@/components/PageFooter.vue';
import PageLeaderboard from '@/components/PageLeaderboard.vue';
import {useRoute} from 'vue-router';
const route = useRoute();
</script>

<template>
    <PageHeader />
    <PageLeaderboard :continent="route.path"/>
    <PageFooter />
</template>

<style scoped></style>
