<script lang="ts" setup>
import QuizQuestion from '@/components/QuizQuestion.vue';
import PageHeader from '@/components/PageHeader.vue';

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <PageHeader />
    <QuizQuestion :id="props.id" />
</template>

<style scoped></style>
