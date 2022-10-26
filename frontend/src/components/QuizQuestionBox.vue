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
    },
    size: {
        type: String,
        required: true,
    },
});

const isCorrect = ref(false);
const isIncorrect = ref(false);
const isCurrentQuestion = ref(false);

const quizStore = useCurrentQuizStore();

let timer: number;

onMounted(() => {
    quizStore.resetAnswers();
    console.log('Store Length: ', quizStore.answers.length);
    console.log('props.index value:', props.index);

    checkAnswer();
    timer = setInterval(() => {
        checkAnswer();
    }, 10);
});

onUnmounted(() => {
    clearInterval(timer);
    quizStore.resetAnswers();
});

function checkAnswer() {
    if (quizStore.currentQuestionIndex === props.index) {
        isCurrentQuestion.value = true;
    }
    if (quizStore.answers[props.index]) {
        if (quizStore.answers[props.index].id == quizStore.currentQuestion.correctAnswer) {
            isCorrect.value = true;
        } else if (quizStore.answers[props.index].id != quizStore.currentQuestion.correctAnswer) {
            isIncorrect.value = true;
        }
    }
}

const sizeAsNumber: number = Number.parseInt(props.size.slice(0, 2));
</script>

<template>
    <div class="box">
        <CheckIcon v-if="isCorrect" :size="sizeAsNumber" class="symbol correct" fillColor="#f9f7f7" />
        <CloseIcon v-else-if="isIncorrect" :size="sizeAsNumber" class="symbol incorrect" fillColor="#f9f7f7" />
        <HelpIcon
            v-else-if="isCurrentQuestion"
            :size="sizeAsNumber"
            class="symbol current-question"
            fillColor="#f9f7f7" />
        <span v-else class="symbol"></span>
    </div>
</template>

<style scoped>
.symbol {
    align-items: center;
    background: var(--color-light-blue);
    border-radius: var(--radius);
    color: #111111;
    display: flex;
    height: v-bind(size);
    justify-content: center;
    text-align: center;
    width: v-bind(size);
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
