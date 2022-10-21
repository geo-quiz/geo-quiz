<script lang="ts" setup>
import GeoButton from '@/components/GeoButton.vue';
import { onMounted, ref } from 'vue';
import router from '@/router';
import { useCurrentQuizStore } from '@/stores/currentQuiz';
import type { IAnswer } from '@/utility/interfaces/IAnswer';

const isCorrect = ref(false);
const isAnswered = ref(false);
const isIncorrectAnswer = ref(true);

const CORRECT = 'Correct answer!';
const INCORRECT = 'Wrong answer!';
const noANSWER = 'No answer was given!';

const msg = ref(INCORRECT);

const currentQuiz = useCurrentQuizStore();

onMounted(() => {
    fetch('http://localhost:3000/quiz/')
        .then((response) => response.json())
        .then((data) => {
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
    return currentQuiz.currentQuestion.answers.findIndex(
        (answer) => answer.id == currentQuiz.currentQuestion.correctAnswer,
    );
}

function getCorrectAnswer() {
    const correct = currentQuiz.currentQuestion.answers[findIndexOfCorrectAnswer()];
    if (correct) {
        return correct.answer;
    } else {
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

function countdown() {
    let timeLeft = 15;
    const downloadTimer = setInterval(function () {
        if (timeLeft < 0 || isAnswered.value === true) {
            clearInterval(downloadTimer);
            isAnswered.value = true;
            if (timeLeft < 0) {
                msg.value = noANSWER;
            }
        } else {
            document.getElementById('countdown')!.innerHTML = timeLeft + '';
        }
        timeLeft -= 1;
    }, 1000);
}
</script>

<template>
    <section v-if="currentQuiz.currentQuestion">
        <h2 class="heading">Europe</h2>
        <div class="wrapper">
            <div class="timer-and-level">
                <div id="timer">
                    <img id="clock" alt="clock icon" src="/images/icons8-clock.svg">
                    <p id="countdown"> {{ countdown() }}</p>
                </div>
            </div>
            <div class="question-div">
                <p class="question-text">{{ currentQuiz.currentQuestion.question }}</p>
            </div>
            <div class="answers">
                <div v-for="(answer, index) in currentQuiz.currentQuestion.answers" :key="index" class="button-wrapper">
                    <GeoButton size="answer" @click="answerQuestion(answer)">
                        {{ answer.answer }}
                    </GeoButton>
                </div>
            </div>
            <div v-if="isAnswered" class="answered">
                <div>
                    <p>{{ msg }}</p>
                    <p v-if="isIncorrectAnswer">The correct answer is: {{ getCorrectAnswer() }}</p>
                </div>
                <GeoButton id="next-question-button" font-size="1.125rem" @click="nextQuestion">
                    Next question
                </GeoButton>
            </div>
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

.button-wrapper {
    width: calc(50% - var(--gap) / 2);
}

.heading {
    color: var(--color-white);
    font-size: 2rem;
    margin: 0;
    text-align: center;
    width: 100%;
}

.timer-and-level {
    align-items: center;
    background: #ffffff;
    border-radius: var(--radius);
    color: #000000;
    display: flex;
    height: 40px;
    justify-content: right;
    width: 75%;
}

#timer {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 4px;
    justify-content: flex-end;
    width: 50%;
}

#clock {
    padding-right: 6vw;
    position: fixed;
}

#countdown {
    font-size: 1.5rem;
    margin-right: 3vw;
}

p {
    margin: 0;
}

.question-div {
    align-items: center;
    background: var(--color-light-blue);
    border-radius: var(--radius);
    display: flex;
    justify-content: center;
    min-height: 100px;
    overflow-wrap: anywhere;
    width: 75%;
}

.question-text {
    color: var(--color-black);
    margin: 0;
    padding: 5px 10px;
}

section {
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    justify-content: center;
}

.wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    width: 100%;
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
</style>
