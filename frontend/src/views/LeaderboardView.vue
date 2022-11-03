<script lang="ts" setup>
import PageHeader from '@/components/PageHeader.vue';
import LeaderboardTable from '@/components/LeaderboardTable.vue';
import {useRoute} from 'vue-router';
const route = useRoute();
</script>

const props = defineProps({ id: { type: String, required: true, }, });

<template>
    <PageHeader />
    <LeaderboardTable :continent="route.path"/>
</template>

<style scoped></style>
