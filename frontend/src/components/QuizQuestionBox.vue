<script lang="ts" setup>
import CheckIcon from 'vue-material-design-icons/Check.vue';
import CloseIcon from 'vue-material-design-icons/Close.vue';
import HelpIcon from 'vue-material-design-icons/Help.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import { useCurrentQuizStore } from '@/stores/currentQuiz';

const props = defineProps({
    index: {
        type: Number,
        required: true,
    }
});

const isCorrect = ref(false);
const isIncorrect = ref(false);
const isCurrentQuestion = ref(false);

const quizStore = useCurrentQuizStore();

let timer: number;

onMounted(() => {
    console.log('Store Length: ', quizStore.answers.length);
    console.log('props.index value:', props.index);

    timer = setInterval(() => {a();}, 1000);
});

onUnmounted(() => {
    clearInterval(timer);
});

function a() {
    if (quizStore.answers.length + 1 === props.index) {
        isCurrentQuestion.value = true;
    } else if ((quizStore.answers[props.index - 1]).id == quizStore.currentQuestion.correctAnswer) {
        isCorrect.value = true;
    } else if (quizStore.answers.length < props.index) {
        isIncorrect.value = true;
    }
}
</script>

<template>
    <div class="box">
        <CheckIcon v-if="isCorrect" :size="32" fillColor="#f9f7f7" class="symbol correct" />
        <CloseIcon v-else-if="isIncorrect" :size="32" fillColor="#f9f7f7" class="symbol incorrect" />
        <HelpIcon v-else-if="isCurrentQuestion" :size="32" fillColor="#f9f7f7" class="symbol current-question" />
        <span v-else class="symbol">X</span>
    </div>
</template>

<style scoped>

.box {
    width: 32px;
    height: 32px;
    border-radius: var(--radius);
    background: var(--color-light-blue);
    display: flex;
    justify-content: center;
    align-items: center;
}

.symbol {
    width: 32px;
    height: 32px;
    border-radius: var(--radius);
    display: block;
    text-align: center;
    color: #111111;
}

.correct {
    background: var(--color-green);
}

.current-question {
    background: #7f7e86;
}

.incorrect {
    background: var(--color-red);
}
</style>