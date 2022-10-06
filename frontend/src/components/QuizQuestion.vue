<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';

const question = 'What is the capital of France?';
const answer = 'Paris';
const answers = ['London', 'Berlin', 'Paris', 'Rome'];
const isCorrect = ref(false);
const isAnswered = ref(false);
const currentAnswer = ref('');

const CORRECT = 'Correct answer';
const INCORRECT = `Incorrect answer, the correct answer is ${answer}`;

let msg = ref(INCORRECT);

function checkAnswer() {
    if (currentAnswer.value === answer) {
        isCorrect.value = true;
        msg.value = CORRECT;
    }
    isAnswered.value = true;
}

function nextQuestion() {
    router.push('next');
}

</script>

<template>
    <section>
        <h1>Quiz</h1>
        <p>Question: {{ question }}</p>
        <ul>
            <li v-for="(answer, index) in answers" :key="index">
                <input type="radio" :value="answer" v-model="currentAnswer" />
                {{ answer }}
            </li>
        </ul>
        <button v-if="!isAnswered" @click="checkAnswer">Check answer</button>
        <p v-if="isAnswered">{{ msg }}</p>
        <button v-if="isAnswered" @click="nextQuestion">Next Question</button>
    </section>
</template>

<style scoped></style>
