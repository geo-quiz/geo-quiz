<script lang="ts" setup>
import type { IQuestion } from '@/utility/interfaces/IQuestion';
import type { PropType } from 'vue';
import { onMounted, ref } from 'vue';

const props = defineProps({
    question: {
        type: Object as PropType<IQuestion>,
        required: true,
    },
    answer: {
        type: Number,
        required: true,
    },
});

const answerText = ref('');
const correctAnswerText = ref('');

function getAnswerText() {
    const answer = props.question.answers.find((answer) => answer.id == props.answer);
    if (answer) {
        answerText.value = answer.answer;
    }
}

function getCorrectAnswerText() {
    const text = props.question.answers.find((answer) => answer.id == props.question.correctAnswer);
    if (text) {
        correctAnswerText.value = text.answer;
    }
}

function checkAnswer(): boolean {
    return props.question.correctAnswer == props.answer;
}

onMounted(() => {
    getAnswerText();
    getCorrectAnswerText();
});
</script>

<template>
    <div class="question-container">
        <div class="question-block">
            <p class="question">{{ question.question }}</p>
        </div>
        <div class="answer-block">
            <div class="answers">
                <p class="answer-title">Correct answer</p>
                <div class="user-answer answer-correct">
                    {{ correctAnswerText }}
                </div>
            </div>
            <div class="answers">
                <p class="answer-title">Your answer</p>
                <div
                    :class="{ 'answer-correct': checkAnswer() === true, 'answer-incorrect': checkAnswer() === false }"
                    class="user-answer">
                    {{ answerText }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.answer-block {
    display: flex;
    gap: calc(var(--gap) * 2);
    margin: 0 16px 16px 16px;
    width: 100%;
}

.answer-title {
    margin: 0;
}

.answers {
    display: flex;
    flex-wrap: wrap;
    gap: calc(var(--gap) / 2);
    justify-content: center;
    width: 100%;
}

.answer-correct {
    background: var(--color-green);
}

.answer-incorrect {
    background: var(--color-red);
}

.question {
    margin: 0;
}

.question-block {
    align-items: center;
    background: var(--color-light-blue);
    border-radius: 8px;
    color: var(--color-black);
    display: flex;
    height: 50px;
    justify-content: center;
    margin: 16px 16px 14px 16px;
    text-align: center;
    width: 100%;
}

.question-container {
    background: var(--color-blue);
    border-radius: 8px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}

.user-answer {
    align-items: center;
    border-radius: 8px;
    display: flex;
    height: 50px;
    justify-content: center;
    width: 100%;
}
</style>
