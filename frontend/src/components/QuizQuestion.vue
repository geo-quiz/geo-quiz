<script lang="ts" setup>
import GeoButton from '@/components/GeoButton.vue';
import QuizQuestionBoxes from '@/components/QuizQuestionBoxes.vue';
import CheckIcon from 'vue-material-design-icons/CheckCircleOutline.vue';
import CloseIcon from 'vue-material-design-icons/CloseCircleOutline.vue';
import ClockIcon from 'vue-material-design-icons/ClockTimeFourOutline.vue';
import GlobeIcon from 'vue-material-design-icons/Earth.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import router from '@/router';
import { useCurrentQuizStore } from '@/stores/currentQuiz';
import type { IAnswer } from '@/utility/interfaces/IAnswer';
import { useUserAnswerStore } from '@/stores/userAnswers';

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const isCorrect = ref(false);
const isAnswered = ref(false);
const isIncorrect = ref(false);
const selectedAnswerId = ref(0);

const nrOfQuestions = ref(0);

const answers = ref(new Map<number, boolean>());

const timeLeft = ref(15);
const timeLeftAsString = ref('15');

const pointsAsString = ref('00');

const currentQuiz = useCurrentQuizStore();
const userAnswers = useUserAnswerStore();

let timer: number;

let nextQuestionTimer: number;

onMounted(() => {
    fetch(`http://localhost:3000/quiz/continent/${props.id}`)
        .then((response) => response.json())
        .then((data) => {
            currentQuiz.setQuestions(data);
            nrOfQuestions.value = currentQuiz.questions.length;
            countdown();
            resetAnswerResponses();
            currentQuiz.resetAnswers();
        })
        .catch(() => {
            router.back();
            alert('Something went wrong, please try again');
        });
    userAnswers.clearAnswers();
    userAnswers.clearQuestions();
});

onUnmounted(() => {
    currentQuiz.resetQuestions();
    currentQuiz.resetAnswers();
    clearInterval(timer);
});

function setAnswers() {
    answers.value = new Map<number, boolean>();
    for (const answer of currentQuiz.currentQuestion.answers) {
        if (answer.id == currentQuiz.currentQuestion.correctAnswer) {
            answers.value.set(answer.id, true);
        } else {
            answers.value.set(answer.id, false);
        }
    }
}

function countdown() {
    timer = setInterval(() => {
        if (!isAnswered.value) {
            timeLeft.value--;
            timeLeftAsString.value = timeLeft.value.toString();
            if (timeLeft.value < 10) {
                timeLeftAsString.value = '0' + timeLeftAsString.value;
            }
            if (timeLeft.value <= 0) {
                answerQuestion(undefined);
            }
        }
    }, 1000);
}

function resetCountdown() {
    timeLeft.value = 15;
    isAnswered.value = false;
}

function answerQuestion(selectedAnswer: IAnswer | undefined) {
    if (!isAnswered.value) {
        if (!selectedAnswer) {
            currentQuiz.setAnswer({ id: 0, answer: 'No answer was given' });
        } else {
            selectedAnswerId.value = selectedAnswer.id;
            currentQuiz.setAnswer(selectedAnswer);
            const indexOfAnswer = findIndexOfAnswer(selectedAnswer);
            const indexOfCorrect = findIndexOfCorrectAnswer();

            if (indexOfAnswer === indexOfCorrect) {
                isCorrect.value = true;
                isIncorrect.value = false;
                currentQuiz.incrementPoints();
                pointsAsString.value = 0 + currentQuiz.points.toString();
            }
        }
    }

    isAnswered.value = true;
    nextQuestionTimer = setTimeout(() => {
        nextQuestion();
    }, 5000);
}

function findIndexOfAnswer(selectedAnswer: IAnswer) {
    return currentQuiz.currentQuestion.answers.indexOf(selectedAnswer);
}

function findIndexOfCorrectAnswer() {
    return currentQuiz.currentQuestion.answers.findIndex(
        (answer) => answer.id == currentQuiz.currentQuestion.correctAnswer,
    );
}

function resetAnswerResponses() {
    isCorrect.value = false;
    isAnswered.value = false;
    isIncorrect.value = true;
    setAnswers();
}

function nextQuestion() {
    clearTimeout(nextQuestionTimer);
    userAnswers.addQuestion(currentQuiz.currentQuestion);
    userAnswers.addAnswer(currentQuiz.currentQuestion.id, selectedAnswerId.value);

    if (currentQuiz.currentQuestionIndex === currentQuiz.questions.length - 1) {
        router.push('/result');
    } else {
        currentQuiz.nextQuestion();
        resetAnswerResponses();
        resetCountdown();
    }
}

function getTitle() {
    switch (props.id) {
        case 'europe':
            return 'Europe';
        case 'asia':
            return 'Asia';
        case 'africa':
            return 'Africa';
        case 'north-america':
            return 'North America';
        case 'south-america':
            return 'South America';
        case 'oceania':
            return 'Oceania';
        case 'world':
            return 'World';
        default:
            return 'Unknown';
    }
}
</script>

<template>
    <div v-if="isAnswered" class="clickable" @click="nextQuestion"></div>
    <main v-if="currentQuiz.currentQuestion">
        <h2 class="heading">{{ getTitle() }}</h2>
        <div class="wrapper">
            <QuizQuestionBoxes :nrOfQuestions="nrOfQuestions" />
            <div class="also-wrapper">
                <div class="timer-and-points">
                    <div id="points">
                        <GlobeIcon :size="32" class="icon" />
                        <p class="score-text">{{ pointsAsString }}</p>
                    </div>
                    <div id="timer">
                        <ClockIcon :size="32" class="icon" />
                        <p class="score-text">{{ timeLeftAsString }}</p>
                    </div>
                </div>
                <div class="question-div">
                    <p class="question-text">{{ currentQuiz.currentQuestion.question }}</p>
                </div>
            </div>
            <div class="answers">
                <div v-for="answer in currentQuiz.currentQuestion.answers" :key="answer.id" class="button-wrapper">
                    <GeoButton :disabled="isAnswered"
                        :class="[
                            { correct: answers.get(answer.id) && isAnswered },
                            { incorrect: !answers.get(answer.id) && isAnswered && selectedAnswerId === answer.id },
                            { 'not-selected': !answers.get(answer.id) && isAnswered && selectedAnswerId !== answer.id },
                        ]"
                        size="answer"
                        @click="answerQuestion(answer)">
                        <div v-if="isAnswered">
                            <CheckIcon v-if="answers.get(answer.id)" :size="32" />
                            <CloseIcon
                                v-else-if="!answers.get(answer.id) && selectedAnswerId === answer.id"
                                :size="32" />
                        </div>
                        {{ answer.answer }}
                    </GeoButton>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.answers {
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);
    justify-content: center;
    width: 100%;
}

.button-wrapper {
    width: calc(50% - var(--gap) / 2);
}

.clickable {
    height: calc(100vh - 100px);
    left: 0;
    position: fixed;
    top: 100px;
    width: 100vw;
    z-index: 1;
}

.icon {
    align-items: center;
    display: flex;
    justify-content: center;
}

.correct,
.correct:hover {
    background: var(--color-green) !important;
    color: white !important;
    cursor: default;
    opacity: 1 !important;
}

.score-text {
    font-size: 1.5rem;
    text-align: right;
    width: 1.75rem;
}

.heading {
    color: var(--color-white);
    font-size: 2rem;
    margin: -8px 0;
    text-align: center;
    width: 100%;
}

.incorrect,
.incorrect:hover {
    background: var(--color-red) !important;
    color: white !important;
    cursor: default;
    opacity: 1 !important;
}

.not-selected,
.not-selected:hover {
    background: var(--color-blue) !important;
    color: var(--color-white) !important;
    cursor: default;
    opacity: 0.75;
}

.timer-and-points {
    align-items: center;
    background: var(--color-light-blue);
    border-radius: var(--radius);
    color: var(--color-black);
    display: flex;
    height: 40px;
    justify-content: right;
    width: 100%;
}

#timer {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: calc((var(--gap) / 3) * 2);
    justify-content: flex-end;
    padding-right: var(--gap);
    width: 50%;
}

#points {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: calc((var(--gap) / 3) * 2);
    justify-content: flex-start;
    padding-left: var(--gap);
    width: 50%;
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
    min-height: 250px;
    overflow-wrap: anywhere;
    width: 100%;
}

.question-text {
    color: var(--color-black);
    margin: 0;
    padding: 5px 10px;
}

main {
    display: flex;
    flex-wrap: wrap;
    gap: calc(var(--gap) * 2);
    justify-content: center;
    min-width: 300px;
    width: 75%;
}

.also-wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    width: 100%;
}

.wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) * 2);
    width: 100%;
}

@media only screen and (min-width: 768px) {
    .question-text {
        font-size: 1.5rem;
    }
}
</style>
