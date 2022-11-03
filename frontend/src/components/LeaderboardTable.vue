<script lang="ts" setup>
import GeoButton from '@/components/GeoButton.vue';
import { computed, onMounted, Ref, ref } from 'vue';
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';
import PageLoad from '@/components/PageLoad.vue';
import PageNotification from '@/components/PageNotification.vue';
import router from '@/router/index';
import type { ILeaderboard } from '@/utility/interfaces/ILeaderboard';
import type { IScore } from '@/utility/interfaces/IScore';
import { useRoute } from 'vue-router';

const awaitingResponse = ref(false);

const route = useRoute();
console.log('continent ', route.params.continent);

let currentContinent = route.params.continent;
console.log('currentContinent ', currentContinent);

const continents = ['africa', 'asia', 'europe', 'north-america', 'oceania', 'south-america', 'world'];

const leaderboards: Ref<ILeaderboard[] | null> = ref(null);
const dailyLeaderboard = computed(() => {
    return leaderboards.value?.filter((board) => board.daily)[0];
});
const overallLeaderboard = computed(() => {
    return leaderboards.value?.filter((board) => !board.daily)[0];
});
const userScores: Ref<ILeaderboard[] | null> = ref(null);
const dailyUserScore = computed(() => {
    return userScores.value?.filter((board) => board.daily)[0];
});
const overallUserScore = computed(() => {
    return userScores.value?.filter((board) => !board.daily)[0];
});

const scores: Ref<IScore[] | null> = ref(null);

let isOverall = ref(true);

function getLeaderboards(currentContinent: string) {
    awaitingResponse.value = true;
    fetch(`http://localhost:3000/leaderboard/${currentContinent}`)
        .then((response) => response.json())
        .then((data: { continentBoards: ILeaderboard[]; userScore: ILeaderboard[] }) => {
            leaderboards.value = data.continentBoards;
            userScores.value = data.userScore;
            awaitingResponse.value = false;
        })
        .catch(() => {
            router.back();
            alert('Something went wrong, please try again');
            awaitingResponse.value = false;
        });
}

onMounted(() => {
    currentContinent = route.params.continent;
    getLeaderboards();
});

function getSubtitle() {
    switch (currentContinent) {
        case 'europe':
            return 'EUROPE';
        case 'asia':
            return 'ASIA';
        case 'africa':
            return 'AFRICA';
        case 'north-america':
            return 'NORTH AMERICA';
        case 'south-america':
            return 'SOUTH AMERICA';
        case 'oceania':
            return 'OCEANIA';
        case 'world':
            return 'WORLD';
        default:
            return 'UNKNOWN';
    }
}

function getPrevious() {
    let previousIndex = continents.findIndex((continent) => continent === currentContinent) - 1;
    if (previousIndex < 0) {
        previousIndex = 6;
    }
    currentContinent = continents[previousIndex];
    getLeaderboards(currentContinent);
}

function getNext() {
    let nextIndex = continents.findIndex((continent) => continent === currentContinent) + 1;
    if (nextIndex > 6) {
        nextIndex = 1;
    }
    currentContinent = continents[nextIndex];
    getLeaderboards(currentContinent);
}

function getDailyBoard() {
    //scores.value = dailyLeaderboard.value.scores;
    isOverall.value = false;
}

function getOverallBoard() {
    // setScoresTable();
    //scores.value = overallLeaderboard.value.scores;
    isOverall.value = true;
}
</script>

<template>
    <main>
        <h1>Leaderboard</h1>

        <div class="wrapper">
            <div class="arrows">
                <div class="arrow-left">
                    <ChevronLeft size="50" @click="getPrevious()"></ChevronLeft>
                </div>
                <h3 class="subtitle">{{ getSubtitle() }}</h3>
                <div class="arrow-right">
                    <ChevronRight size="50" @click="getNext()"></ChevronRight>
                </div>
            </div>

            <div class="overall-daily-buttons-wrapper">
                <GeoButton v-if="isOverall" class="overall-button-disabled" font-size="1.125rem">Overall</GeoButton>
                <GeoButton v-else class="overall-button-active" font-size="1.125rem" @click="getOverallBoard()"
                    >Overall</GeoButton
                >

                <GeoButton v-if="isOverall" class="daily-button-active" font-size="1.125rem" @click="getDailyBoard()"
                    >Daily</GeoButton
                >
                <GeoButton v-else class="daily-button-disabled" font-size="1.125rem">Daily</GeoButton>
            </div>

            <img id="crown" src="/images/crown.svg" alt="Winner's crown." />

            <div id="profile-pictures-wrapper" class="field">
                <div class="profile-picture-div">
                    <img id="profile-picture-second" src="/images/gubbe-left.svg" alt="Second place profile picture" />
                    <label class="medallion" id="medallion-second">2</label>
                    <img
                        id="profile-picture-first"
                        src="/images/default-profile-picture.svg"
                        alt="First place profile picture" />
                    <label class="medallion" id="medallion-first">1</label>
                    <img id="profile-picture-third" src="/images/gubbe-right.svg" alt="Third place profile picture" />
                    <label class="medallion" id="medallion-third">3</label>
                </div>
            </div>
            <div class="medallion-wrapper">
                <div class="medallion-div"></div>
            </div>

            <div class="winner-container">
                <div class="winner-stats">
                    <label class="winner-name">Second place name</label>
                    <div class="winner-time-points">
                        <label class="winner-points">200p</label>
                        <label class="winner-time">20s</label>
                    </div>
                </div>
                <div class="winner-stats">
                    <label class="winner-name">First place name</label>
                    <div class="winner-time-points">
                        <label class="winner-points">300p</label>
                        <label class="winner-time">10s</label>
                    </div>
                </div>
                <div class="winner-stats">
                    <label class="winner-name">Third place name</label>
                    <div class="winner-time-points">
                        <label class="winner-points">100p</label>
                        <label class="winner-time">30s</label>
                    </div>
                </div>
            </div>

            <div class="table-wrapper">
                <table v-if="isOverall" id="overallTable">
                    <tr>
                        getScoresTable() Overall
                    </tr>
                </table>
                <table v-else id="dailyTable">
                    <tr>
                        getScoresTable() Daily
                    </tr>
                </table>
                <!--                <div class="leaders-table">-->
                <!--                    <div v-for="(score, index) in scores" :key="index" class="table-wrapper">-->
                <!--                        <table>-->
                <!--                            <tr>-->
                <!--                                <th>{{ score.displayName }}</th>-->
                <!--                                <th>{{ score.points }}</th>-->
                <!--                                <th>{{ score.time }}</th>-->
                <!--                            </tr>-->
                <!--                        </table>-->
                <!--                    </div>-->
                <!--                </div>-->
            </div>
        </div>
    </main>

    <PageNotification v-if="awaitingResponse">
        <div id="notification-wrapper">
            <PageLoad />
        </div>
    </PageNotification>
</template>

<style scoped>
.arrows {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.arrow-left {
}

.arrow-right {
}

.daily-button-active {
    border-radius: 0 var(--radius) var(--radius) 0;
    font-size: 1.125rem;
}

.daily-button-disabled {
    border-radius: 0 var(--radius) var(--radius) 0;
    background: var(--color-light-blue);
    color: var(--color-black);
    font-size: 1.125rem;
}

h1,
h3 {
    text-align: center;
}

main {
    width: 100%;
}

.medallion {
    align-items: center;
    border: 3px var(--color-light-blue) solid;
    border-radius: 90px;
    display: flex;
    height: 40px;
    justify-content: center;
    margin: -15px;
    width: 40px;
}

.overall-button-active {
    border-radius: var(--radius) 0 0 var(--radius);
    font-size: 1.125rem;
}

.overall-button-disabled {
    border-radius: var(--radius) 0 0 var(--radius);
    background: var(--color-light-blue);
    color: var(--color-black);
    font-size: 1.125rem;
}

.overall-daily-buttons-wrapper {
    align-items: center;
    display: flex;
    flex-direction: row;
    margin-bottom: -80px;
    width: 50%;
}

.profile-picture-div {
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.subtitle {
    margin-top: 12px;
}

.table-wrapper {
    background: var(--color-light-blue);
    border: none;
    border-radius: var(--radius);
    color: var(--color-black);
    padding: 3px 6px;
    width: 100%;
}

.winner-container {
    display: flex;
    flex-direction: row;
    gap: calc(var(--gap) * 3.7);
    justify-content: center;
}

.winner-name {
    display: flex;
    text-align: center;
}
.winner-points {
    align-items: center;
    background: var(--color-light-blue);
    border-radius: var(--radius) 0 0 var(--radius);
    color: var(--color-black);
    display: flex;
    height: 150%;
    justify-content: center;
    width: 100%;
}

.winner-stats {
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) * 2);
    justify-content: center;
}

.winner-time {
    align-items: center;
    background: var(--color-light-blue);
    border-radius: 0 var(--radius) var(--radius) 0;
    border-left-color: 1px var(--color-blue);
    border-left-style: solid;
    color: var(--color-black);
    display: flex;
    height: 150%;
    justify-content: center;
    width: 100%;
}

.winner-time-points {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) * 2);
    width: 100%;
}

#crown {
    left: 0;
    position: relative;
    top: 60%;
    transform: translate(-105%, 80%);
    height: 80px;
    width: 80px;
}

#medallion-first {
    background: #c29b0c;
    position: relative;
    left: -105px;
    top: 5px;
}

#medallion-second {
    background: #71706e;
    position: relative;
    left: -90px;
    top: 5px;
}

#medallion-third {
    background: #804a00;
    position: relative;
    left: -80px;
    top: 5px;
}

#notification-wrapper {
    align-items: center;
    background: var(--color-dark-blue);
    border-radius: var(--radius);
    display: flex;
    height: 175px;
    justify-content: center;
    width: 80%;
}

#profile-picture-first {
    background: var(--color-light-blue);
    border: 5px var(--color-blue) solid;
    border-radius: 90px;
    height: 180px;
    width: 180px;
}

#profile-picture-second {
    background: var(--color-light-blue);
    border: 5px var(--color-blue) solid;
    border-radius: 90px;
    height: 150px;
    width: 150px;
}

#profile-picture-third {
    background: var(--color-light-blue);
    border: 5px var(--color-blue) solid;
    border-radius: 90px;
    height: 130px;
    width: 130px;
}
</style>
