<script lang="ts" setup>
import { ref } from 'vue';
import router from '@/router';
import GeoButton from '@/components/GeoButton.vue';

const question = 'What is the capital of France?';
const answer = 'Paris';
const answers = ['London', 'Berlin', 'Paris', 'Rome'];
const isCorrect = ref(false);
const isAnswered = ref(false);
const isIncorrectAnswer = ref(true);

const CORRECT = 'Correct';
const INCORRECT = 'Wrong';

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
            <GeoButton
                v-for="(answer, index) in answers"
                :key="index"
                class="button"
                font-size="1.125rem"
                height="100px"
                @click="answerQuestion(answer)">
                {{ answer }}
            </GeoButton>
        </div>
        <div v-if="isAnswered" class="answered">
            <div class="answered-message">
                <p>{{ msg }} answer!</p>
                <p v-if="isIncorrectAnswer">The correct answer is: {{ answer }}</p>
            </div>
            <GeoButton id="next-question-button" class="button" font-size="1.125rem" @click="nextQuestion">
                Next question
            </GeoButton>
        </div>
    </section>
</template>

<style scoped>
.answers {
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);
    justify-content: center;
    width: 75%;
}

.answered {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    text-align: center;
    width: 75%;
}

.answered-message {
    background: #3f72af;
    border-radius: var(--radius);
    color: #f9f7f7;
    padding: 5px;
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
    gap: var(--gap);
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

@media only screen and (min-width: 768px) {
    .answers {
        width: 75%;
    }

    .answered {
        width: 75%;
    }

    #next-question-button {
        width: 30%;
    }

    .question-div {
        min-height: 150px;
        width: 75%;
    }

    .question-text {
        font-size: 1.5rem;
    }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) {
    .button {
        font-size: 1.5rem;
    }
}

@media only screen and (min-width: 1024px) {
    .button {
        font-size: 1.75rem;
    }
}
</style>
