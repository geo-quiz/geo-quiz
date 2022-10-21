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
    <div class="center-vertical">
        <PageHeader />
        <QuizQuestion :id="props.id"/>
    </div>
</template>

<style scoped></style>
