<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import router from '@/router';
import {useCurrentQuizStore} from '@/stores/currentQuiz';
import type {IAnswer} from '@/utility/interfaces/IAnswer';


const isCorrect = ref(false);
const isAnswered = ref(false);
const isIncorrectAnswer = ref(true);

const CORRECT = 'Rätt';
const INCORRECT = 'Fel';

const msg = ref(INCORRECT);

const currentQuiz = useCurrentQuizStore();

onMounted(() => {
    console.log('hej');
    fetch('http://localhost:3000/quiz/').then(response => response.json()).then(data => {
        currentQuiz.setQuestions(data);
    });
});

function answerQuestion(selectedAnswer: IAnswer) {
    if (!isAnswered.value) {
        const indexOfAnswer = findIndexOfAnswer(selectedAnswer);
        const indexOfCorrect = findIndexOfCorrectAnswer();

        if (indexOfAnswer === indexOfCorrect) {
            isCorrect.value = true;
            msg.value = CORRECT;
            isIncorrectAnswer.value = false;
        }
    }
    isAnswered.value = true;
}

function findIndexOfAnswer(selectedAnswer: IAnswer) {
    return currentQuiz.currentQuestion.answers.indexOf(selectedAnswer);
}

function findIndexOfCorrectAnswer() {
    return currentQuiz.currentQuestion.answers.findIndex(answer => answer.id == currentQuiz.currentQuestion.correctAnswer);
}

function getCorrectAnswer() {
    const correct = currentQuiz.currentQuestion.answers[findIndexOfCorrectAnswer()];
    if (correct != undefined) {
        return correct.answer;
    }
    else {
        console.error('Correct answer not found');
    }
}

function resetAnswerResponses() {
    isCorrect.value = false;
    isAnswered.value = false;
    isIncorrectAnswer.value = true;
    msg.value = INCORRECT;
}

function nextQuestion() {
    if (currentQuiz.currentQuestionIndex === currentQuiz.questions.length - 1) {
        router.push('next');
    } else {
        resetAnswerResponses();
        currentQuiz.nextQuestion();
    }
}


</script>


<template>
    <section v-if="currentQuiz.currentQuestion">
        <h2 class="heading">Europa</h2>
        <div class="question-div">
            <p class="question-text">{{ currentQuiz.currentQuestion.question }}</p>
        </div>
        <div class="answers">
            <button
                v-for="(answer, index) in currentQuiz.currentQuestion.answers"
                :key="index"
                class="answer-button button"
                @click="answerQuestion(answer)">
                {{ answer.answer }}
            </button>
        </div>
        <div v-if="isAnswered" class="answered">
            <div class="answered-message">
                <p>{{ msg }} svar!</p>
                <p v-if="isIncorrectAnswer">Rätt svar var: {{ getCorrectAnswer() }}</p>
            </div>
            <button id="next-question-button" class="button" @click="nextQuestion">Nästa Fråga</button>
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
    justify-content: center;
    width: 75%;
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
    height: 40px;
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

@media only screen and (min-width: 768px) {
    .answers {
        width: 75%;
    }

    .answer-button {
        width: calc(50% - (15px / 2));
    }

    .answered {
        width: 75%;
    }

    .answered-message {
        font-size: 1.125rem;
    }

    .button {
        font-size: 1rem;
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
        height: 50px;
    }
}

@media only screen and (min-width: 1024px) {
    .button {
        height: 75px;
    }
}
</style>
