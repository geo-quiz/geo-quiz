<script lang="ts" setup>
import QuizQuestionBox from '@/components/QuizQuestionBox.vue';

const props = defineProps({
    nrOfQuestions: {
        type: Number,
        required: true,
    }
});
</script>

<template>
    <div class="box-wrapper">
        <QuizQuestionBox v-for="(index) in props.nrOfQuestions" :key="index" :index="index" />
    </div>
</template>

<style scoped>
.box-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: var(--gap);
}
</style>