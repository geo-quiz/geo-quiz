<script lang="ts" setup>
import GeoButton from '@/components/GeoButton.vue';
import ArrowRightThinCircleOutline from 'vue-material-design-icons/arrowrightthincircleoutline.vue';
import ClockTimeTenOutline from 'vue-material-design-icons/clocktimetenoutline.vue';
import Earth from 'vue-material-design-icons/earth.vue';
import ShareVariantOutline from 'vue-material-design-icons/sharevariantoutline.vue';</script>

<template>
    <div class="results">
        <h2>Results</h2>
        <div class="buttons">
            <GeoButton>
                <ShareVariantOutline class="icons" />
                Share
            </GeoButton>
            <GeoButton color="green">
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
                    <div class="total">6 points</div>
                </div>
            </div>
            <div id="total-time">
                <div class="test">
                    <ClockTimeTenOutline class="total-header">Total time</ClockTimeTenOutline>
                    <p>Total time</p>
                </div>
                <div class="test2">
                    <div class="total">36 seconds</div>
                </div>
            </div>
        </div>
        <div class="question-container">
            <div class="question-block">
                <p class="question">1. In which US state is Mount Rushmore located?</p>
            </div>
            <div class="answer-block">
                <div class="answers">
                    <p class="correct-answer-title">Correct answer</p>
                    <div class="correct-answer">South Dakota</div>
                </div>
                <div class="answers">
                    <p class="correct-answer-title">Your answer</p>
                    <div class="wrong-answer">North Dakota</div>
                </div>
            </div>
        </div>
        <div class="question-container">
            <div class="question-block">
                <p class="question">2. What is the state capital of Florida?</p>
            </div>
            <div class="answer-block">
                <div class="answers">
                    <p class="correct-answer-title">Correct answer</p>
                    <div class="correct-answer">Tallahassee</div>
                </div>
                <div class="answers">
                    <p class="correct-answer-title">Your answer</p>
                    <div class="wrong-answer">Miami</div>
                </div>
            </div>
        </div>
        <div class="buttons">
            <GeoButton>
                <ShareVariantOutline class="icons" />
                Share
            </GeoButton>
            <GeoButton color="green">
                <ArrowRightThinCircleOutline class="icons" />
                Continue
            </GeoButton>
        </div>
    </div>
</template>

<style scoped>
.answers {
    display: flex;
    flex-wrap: wrap;
    gap: calc(var(--gap) / 2);
    justify-content: center;
    width: 100%;
}

.answer-block {
    display: flex;
    gap: calc(var(--gap) * 2);
    margin: 0 16px 16px 16px;
    width: 100%;
}

.buttons {
    display: flex;
    gap: calc(var(--gap) * 2);
    width: 100%;
}

.correct-answer {
    align-items: center;
    background: var(--color-green);
    border-radius: 8px;
    color: var(--color-light-blue);
    display: flex;
    height: 50px;
    justify-content: center;
    width: 100%;
}

.correct-answer-title {
    margin: 0;
}

h2 {
    font-size: 2rem;
    margin: 8px 0 10px 0;
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

.results {
    display: flex;
    flex-wrap: wrap;
    gap: calc(var(--gap) * 2);
    justify-content: center;
    margin-top: 120px;
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

.wrong-answer {
    align-items: center;
    background: var(--color-red);
    border-radius: 8px;
    display: flex;
    height: 50px;
    justify-content: center;
    width: 100%;
}
</style>
