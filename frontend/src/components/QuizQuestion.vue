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

<style scoped>
* {
    --radius: 5px;
}

.answers {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    width: 75%;
    justify-content: center;
}

.answer-button {
    width: 100%;
}

.answered {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 15px;
    text-align: center;
    width: 75%;
}

.answered-message {
    background: #3f72af;
    border-radius: var(--radius);
    color: #f9f7f7;
    padding: 5px;
}

.button {
    background: #3f72af;
    border: none;
    border-radius: var(--radius);
    color: #f9f7f7;
    height: 30px;
}

.heading {
    color: #f9f7f7;
    font-size: 2rem;
    margin: 0;
    text-align: center;
    width: 100%;
}

p {
    margin: 0;
}

section {
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    height: 100%;
    justify-content: center;
}

.question-div {
    align-items: center;
    background: #f9f7f7;
    border-radius: var(--radius);
    display: flex;
    justify-content: center;
    min-height: 100px;
    overflow-wrap: anywhere;
    width: 75%;
}

.question-text {
    margin: 0;
    padding: 5px 10px;
}
</style>
