<script lang="ts" setup>
import GeoButton from '@/components/GeoButton.vue';
import ArrowRightThinCircleOutline from 'vue-material-design-icons/arrowrightthincircleoutline.vue';
import ClockTimeTenOutline from 'vue-material-design-icons/clocktimetenoutline.vue';
import Earth from 'vue-material-design-icons/earth.vue';
import ShareVariantOutline from 'vue-material-design-icons/sharevariantoutline.vue';
import { ref, Ref } from 'vue';
import { useUserAnswerStore } from '@/stores/userAnswers';
import type { IQuestion } from '@/utility/interfaces/IQuestion';
import router from '@/router';
import ResultAnswer from '@/components/ResultAnswer.vue';
import { useCurrentQuizStore } from '@/stores/currentQuiz';

const userAnswersStore = useUserAnswerStore();

const currentQuiz = useCurrentQuizStore();

const usersAnswer: Ref<Map<number, number>> = ref(userAnswersStore.answers);
const questions: Ref<IQuestion[]> = ref(userAnswersStore.questions);
const totalTime: Ref<Number> = ref(currentQuiz.totalTime);

function proceed() {
    router.push('/home').then(() => {
        userAnswersStore.clearAnswers();
        userAnswersStore.clearQuestions();
    }).catch((error) => {
        console.log(error);
    });
}
</script>

<template>
    <div class="results">
        <h2>Results</h2>
        <div class="buttons">
            <GeoButton>
                <ShareVariantOutline class="icons" />
                Share
            </GeoButton>
            <GeoButton color="green" @click="proceed">
                <ArrowRightThinCircleOutline class="icons" />
                Continue
            </GeoButton>
        </div>
        <div class="score-container">
            <div id="total-score">
                <div class="test">
                    <Earth class="total-header">Total score</Earth>
                    <p>Total score</p>
                </div>
                <div class="test2">
                    <div class="total">{{ currentQuiz.points }}</div>
                </div>
            </div>
            <div id="total-time">
                <div class="test">
                    <ClockTimeTenOutline class="total-header">Total time</ClockTimeTenOutline>
                    <p>Total time</p>
                </div>
                <div class="test2">
                    <div class="total">{{ totalTime }}</div>
                </div>
            </div>
        </div>
        <div v-if="usersAnswer.size > 0" class="answer-wrapper">
            <ResultAnswer
                v-for="question in questions"
                :key="question.id"
                :answer="usersAnswer.get(question.id)"
                :question="question" />
        </div>
        <div class="buttons">
            <GeoButton>
                <ShareVariantOutline class="icons" />
                Share
            </GeoButton>
            <GeoButton color="green" @click="proceed">
                <ArrowRightThinCircleOutline class="icons" />
                Continue
            </GeoButton>
        </div>
    </div>
</template>

<style scoped>
.answer-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
}

.buttons {
    display: flex;
    gap: calc(var(--gap) * 2);
    width: 100%;
}

h2 {
    font-size: 2rem;
    margin: 8px 0 10px 0;
}

.results {
    display: flex;
    flex-wrap: wrap;
    gap: calc(var(--gap) * 2);
    justify-content: center;
    width: 100%;
}

.score-container {
    background: var(--color-blue);
    border-radius: 8px;
    display: flex;
    width: 100%;
}

.test {
    display: flex;
    gap: var(--gap);
    justify-content: center;
    margin-bottom: -8px;
}

.total {
    align-items: center;
    background: var(--color-light-blue);
    border-radius: 8px;
    color: var(--color-black);
    display: flex;
    font-size: 1.2rem;
    height: 50px;
    justify-content: center;
}

.total-header {
    display: flex;
    justify-content: center;
    margin-bottom: 4px;
    margin-top: 12px;
}

#total-score {
    margin: 0 8px 16px 16px;
    width: 100%;
}

#total-time {
    margin: 0 16px 16px 8px;
    width: 100%;
}
</style>