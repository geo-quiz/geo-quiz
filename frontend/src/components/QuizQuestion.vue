<script lang="ts" setup>
import { ref } from 'vue';
import router from '@/router';

const question = 'What is the capital of France?';
const answer = 'Paris';
const answers = ['London', 'Berlin', 'Paris', 'Rome'];
const isCorrect = ref(false);
const isAnswered = ref(false);
const isIncorrectAnswer = ref(true);

const CORRECT = 'Correct answer!';
const INCORRECT = 'Incorrect answer!';

const msg = ref(INCORRECT);

function answerQuestion(selectedAnswer: string) {
    if (!isAnswered.value) {
        const indexOfAnswer = findIndexOfAnswer(selectedAnswer);

        if (indexOfAnswer === findIndexOfCorrectAnswer()) {
            isCorrect.value = true;
            msg.value = CORRECT;
            isIncorrectAnswer.value = false;
        }
        isAnswered.value = true;
    }
}

function findIndexOfAnswer(selectedAnswer: string) {
    return answers.indexOf(selectedAnswer);
}

function findIndexOfCorrectAnswer() {
    return answers.indexOf(answer);
}

function nextQuestion() {
    router.push('next');
}
</script>

<template>
    <section>
        <h2 class="heading">Europe</h2>
        <div class="question-div">
            <p class="question-text">{{ question }}</p>
        </div>
        <div class="answers">
            <button
                v-for="(answer, index) in answers"
                :key="index"
                class="answer-button button"
                @click="answerQuestion(answer)">
                {{ answer }}
            </button>
        </div>
        <div v-if="isAnswered" class="answered">
            <div class="answered-message">
                <p>{{ msg }}</p>
                <p v-if="isIncorrectAnswer">Correct answer was: {{ answer }}</p>
            </div>
            <button class="button" @click="nextQuestion">Next Question</button>
        </div>
    </section>
</template>

<style scoped></style>
