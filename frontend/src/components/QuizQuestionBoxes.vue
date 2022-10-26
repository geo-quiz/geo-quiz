<script lang="ts" setup>
import QuizQuestionBox from '@/components/QuizQuestionBox.vue';
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    nrOfQuestions: {
        type: Number,
        required: true,
    }
});

const size = ref('26px');

function setBoxSize(width: number) {
    if (width < 500) {
        return '26px';
    } else if (width >= 500 && width < 525) {
        return '28px';
    } else if (width >= 525 && width < 600) {
        return '30px';
    } else if (width >= 600 && width < 675) {
        return '32px';
    }else if (width >= 675 && width < 750) {
        return '36px';
    }else if (width >= 750) {
        return '40px';
    } else {
        return '26px';
    }
}

function onResize() {
    size.value = setBoxSize(window.innerWidth);
}

onMounted(() => {
    window.addEventListener('resize', onResize);
    onResize();
});

onUnmounted(() => {
    window.removeEventListener('resize', onResize);
});
</script>

<template>
    <div class="box-wrapper">
        <QuizQuestionBox v-for="(index) in props.nrOfQuestions" :key="index" :index="index - 1" :size="size" />
    </div>
</template>

<style scoped>
.box-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
}
</style>