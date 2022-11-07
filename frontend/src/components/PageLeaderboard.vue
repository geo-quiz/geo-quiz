<script lang="ts" setup>
import ArrowRightThinCircleOutline from 'vue-material-design-icons/arrowrightthincircleoutline.vue';
import ArrowLeftThinCircleOutline from 'vue-material-design-icons/arrowleftthincircleoutline.vue';
import { computed, onMounted, Ref, ref } from 'vue';
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';
import GeoButton from '@/components/GeoButton.vue';
import PageLoad from '@/components/PageLoad.vue';
import router from '@/router/index';
import type { ILeaderboard } from '@/utility/interfaces/ILeaderboard';
import type { IScore } from '@/utility/interfaces/IScore';
import { useAuthStore } from '@/stores/auth';
import { useRoute } from 'vue-router';

const defaultScore = { id: -1, points: -1, time: -1, account: {displayName: '', profilePicture: ''} } as IScore;
const authStore = useAuthStore();
const awaitingResponse = ref(false);

const route = useRoute();
console.log('continent ', route.params.continent);

let currentContinent: string = route.params.continent as string;
console.log('currentContinent ', currentContinent);

const continents = ['africa', 'all', 'asia', 'europe', 'north-america', 'oceania', 'south-america', 'world'];

const leaderboards: Ref<ILeaderboard[] | null> = ref(null);
let dailyLeaderboard = computed(() => {
    return leaderboards.value?.filter((board) => board.daily)[0];
});
let overallLeaderboard = computed(() => {
    return leaderboards.value?.filter((board) => !board.daily)[0];
});
const userScores: Ref<ILeaderboard[] | null> = ref(null);
const dailyUserScore = computed(() => {
    return userScores.value?.filter((board) => board.daily)[0];
});
const overallUserScore = computed(() => {
    return userScores.value?.filter((board) => !board.daily)[0];
});

const rowsToShow = ref(5);

let scores: Ref<IScore[]> = ref([]);
let first: Ref<IScore> = ref(defaultScore);
let second: Ref<IScore> = ref(defaultScore);
let third: Ref<IScore> = ref(defaultScore);
let scoresTable: Ref<IScore[]> = ref([]);
let currentTableIndex = ref(0);
let nextTableIndex = ref(0);
let previousTableIndex = ref(0);
let hasPrevious = ref(false);
let hasNext = ref(false);

let isOverall = ref(true);
let showUserScore = ref(false);
let userIndex = ref(-1);
let userTableScore = ref(defaultScore);
let isInList = ref(false);


function getLeaderboards(newContinent: string) {
    console.log('in getLeadersboards');
    fetch(`http://localhost:3000/leaderboard/${newContinent}`, {
        headers: {
            Authorization: 'Bearer ' + authStore.getToken(),
        },
    })
        .then((response) =>
            response.json().then((data: { continentBoards: ILeaderboard[]; userScore: ILeaderboard[] }) => {
                leaderboards.value = data.continentBoards;
                userScores.value = data.userScore;
                console.log(leaderboards.value);
                console.log(newContinent, 'loaded');
                console.log(leaderboards.value[0].id);
                console.log(leaderboards.value[0].daily);
            }),
        )
        .catch(() => {
            router.back();
            alert('Something went wrong, please try again');
        });
}

onMounted(() => {
    let currentContinent: string = route.params.continent as string;
    loadContinent(currentContinent);
    console.log('finished mounting- currentContinent ', currentContinent);
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
        case 'all':
            return 'ALL';
        default:
            return 'UNKNOWN';
    }
}

function loadContinent(nextContinent: any) {
    awaitingResponse.value = true;
    resetScores();
    getLeaderboards(nextContinent);
    currentContinent = nextContinent;
    setTimeout(() => {
        getDailyBoard();
        awaitingResponse.value = false;
    }, 350);
}

function getPrevious() {
    let previousIndex = continents.findIndex((continent) => continent === currentContinent) - 1;
    if (previousIndex < 0) {
        previousIndex = 6;
    }
    const nextContinent = continents[previousIndex];
    loadContinent(nextContinent);
    console.log('finished getPrevious');
}

function getNext() {
    console.log('in getNext');
    let nextIndex = continents.findIndex((continent) => continent === currentContinent) + 1;
    if (nextIndex > 6) {
        nextIndex = 0;
    }
    const nextContinent = continents[nextIndex];
    //router.push('/leaderboard/${currentContinent}');
    loadContinent(nextContinent);
    console.log('finished getNext');
}

function resetScores() {
    scoresTable.value = [];
    currentTableIndex.value = 0;
    nextTableIndex.value = 0;
    previousTableIndex.value = 0;
    first.value = defaultScore;
    second.value = defaultScore;
    third.value = defaultScore;
}

function setupScoresAndTable() {
    resetScores();
    if (scores.value[0]) {
        first.value = scores.value[0];
        console.log((first.value));
    } else {
        third.value = defaultScore;
    }
    if (scores.value[1]) {
        second.value = scores.value[1];
    } else {
        third.value = defaultScore;
    }
    if (scores.value[2]) {
        third.value = scores.value[2];
    } else {
        third.value = defaultScore;
    }
    if (scores.value[3]) {
        currentTableIndex.value = 3;
        scoresTable.value = scores.value.slice(currentTableIndex.value, currentTableIndex.value + rowsToShow.value);
        if (scores.value[3 + rowsToShow.value]) {
            nextTableIndex.value = 3 + rowsToShow.value;
            hasNext.value = true;
        } else {
            hasNext.value = false;
        }
    } else {
        console.log('no values left in scores to assign to scoresTable');
    }
}

function nextTable() {
    if (scores.value.length > 7 && scores.value[nextTableIndex.value]) {
        setPreviousTableIndex(currentTableIndex.value);
        currentTableIndex.value = nextTableIndex.value;
        if (scores.value[currentTableIndex.value + rowsToShow.value]) {
            console.log('nextTable has stuff');
            hasNext.value = true;
            nextTableIndex.value = currentTableIndex.value + rowsToShow.value;
        }
        else {
            console.log('next nextTable doesnt has stuff');
            hasNext.value = false;
        }
        scoresTable.value = scores.value.slice(currentTableIndex.value, currentTableIndex.value + rowsToShow.value);
    } else {
        hasNext.value = false;
    }
}

function setNextTableIndex(index: number) {
    hasNext.value = true;
    nextTableIndex.value = index;
}

function setPreviousTableIndex(index: number) {
    hasPrevious.value = true;
    previousTableIndex.value = index;
}

function previousTable() {
    if (previousTableIndex.value > 2 && scores.value[previousTableIndex.value]) {
        setNextTableIndex(currentTableIndex.value);
        currentTableIndex.value = previousTableIndex.value;
        if (scores.value[currentTableIndex.value - rowsToShow.value]) {
            console.log('previousTable has stuff');

            hasPrevious.value = true;
            previousTableIndex.value = currentTableIndex.value - rowsToShow.value;
        } else {
            console.log('previousTable doesnt has stuff');
            hasPrevious.value = false;
        }
        scoresTable.value = scores.value.slice(currentTableIndex.value, currentTableIndex.value + rowsToShow.value);
    } else {
        hasPrevious.value = false;
    }
}

function getDailyBoard() {
    console.log('start getDailyBoard()');

    if (dailyLeaderboard.value) {
        if (dailyLeaderboard.value.scores) {
            if (dailyLeaderboard.value.scores.length > 0) {
                console.log('dailyBoard has data');
                scores.value = dailyLeaderboard.value.scores;
                setupScoresAndTable();
                if (dailyUserScore.value) {
                    isInScoresTable(dailyUserScore.value);
                } else {
                    console.log('no value in dailyUserLeaderboard scores');
                }
            }
        } else {
            console.log('no value in dailyLeaderboard');
        }
        isOverall.value = false;
    }
}

function getOverallBoard() {
    console.log('start getOverallBoard()');
    if (overallLeaderboard.value) {
        console.log('overallBoard has data');
        if (overallLeaderboard.value.scores) {
            scores.value = overallLeaderboard.value.scores;
            setupScoresAndTable();
            if (overallUserScore.value) {
                isInScoresTable(overallUserScore.value);
            } else {
                console.log('no value in overallLeaderboard scores');
            }
        } else {
            console.log('no value in overallLeaderboard');
        }
        isOverall.value = true;
    }
}


function isInScoresTable(userScore: ILeaderboard) {
    let isInThisList = ref(false);
    let index = ref(0);

    for (let i = 0; i < scoresTable.value.length; i++) {
        if (userScore.scores[0].account.displayName === scores.value[i].account.displayName) {
            isInList.value = true;
        }
        if (userScore.scores[0].account.displayName === scoresTable.value[i].account.displayName) {
            isInThisList.value = true;
            userIndex.value = i + currentTableIndex.value;
            index.value = i;
        } else {
            isInList.value = false;
        }
    }
    if (isInList.value && !isInThisList.value) {
        userTableScore.value.account.displayName = scoresTable.value[index.value].account.displayName;
        userTableScore.value.points = scoresTable.value[index.value].points;
        userTableScore.value.time = scoresTable.value[index.value].time;
        showUserScore.value = true;
    } else {
        isInThisList.value = false;
        userTableScore.value = defaultScore;
        showUserScore.value = false;
    }
}
</script>

<template>
    <main>
        <h1>Leaderboard</h1>

        <div class="wrapper">
            <div class="arrows">
                <div class="arrow-left" @click="getPrevious()">
                    <ChevronLeft :size="50"></ChevronLeft>
                </div>
                <h3 v-if="!awaitingResponse" class="subtitle">{{ getSubtitle() }}</h3>
                <div class="arrow-right" @click="getNext()">
                    <ChevronRight :size="50"></ChevronRight>
                </div>
            </div>

            <div class="overall-daily-buttons-wrapper">
                <GeoButton v-if="isOverall" class="daily-button-active" @click="getDailyBoard">Daily</GeoButton>
                <GeoButton v-else class="daily-button-disabled">Daily</GeoButton>

                <GeoButton v-if="isOverall" class="overall-button-disabled">Overall</GeoButton>
                <GeoButton v-else class="overall-button-active" @click="getOverallBoard">Overall</GeoButton>
            </div>
            <PageLoad v-if="awaitingResponse" />
            <div v-else class="wrapper">
                <div id="profile-pictures-wrapper">
                    <div class="profile-picture-div">
                        <img
                            id="profile-picture-second"
                            alt="Second place profile picture"
                            :src="'http://localhost:3000/' + second.account.profilePicture" />
                        <label id="medallion-second" class="medallion">2</label>
                        <img
                            id="profile-picture-first"
                            alt="First place profile picture"
                            :src="'http://localhost:3000/' + first.account.profilePicture" />
                        <label id="medallion-first" class="medallion">1</label>
                        <img
                            id="profile-picture-third"
                            alt="Third place profile picture"
                            :src="'http://localhost:3000/' + third.account.profilePicture" />
                        <label id="medallion-third" class="medallion">3</label>
                    </div>
                    <div id="crown"></div>
                </div>
                <div class="medallion-wrapper">
                    <div class="medallion-div"></div>
                </div>

                <div class="winner-container">
                    <div class="winner-stats">
                        <label class="winner-name">{{ second.account.displayName }}</label>
                        <div class="winner-time-points">
                            <label v-if="second.account.displayName" class="winner-points">{{ second.points }}p</label>
                            <label v-else class="winner-points"> </label>
                            <label v-if="second.account.displayName" class="winner-time">{{ second.time }}s</label>
                            <label v-else class="winner-time"> </label>
                        </div>
                    </div>
                    <div class="winner-stats">
                        <label class="winner-name">{{ first.account.displayName }}</label>
                        <div class="winner-time-points">
                            <label v-if="first.account.displayName" class="winner-points">{{ first.points }}p</label>
                            <label v-else class="winner-points"> </label>
                            <label v-if="first.account.displayName" class="winner-time">{{ first.time }}s</label>
                            <label v-else class="winner-time"> </label>
                        </div>
                    </div>
                    <div class="winner-stats">
                        <label class="winner-name">{{ third.account.displayName }}</label>
                        <div class="winner-time-points">
                            <label v-if="third.account.displayName" class="winner-points">{{ third.points }}p</label>
                            <label v-else class="winner-points"> </label>
                            <label v-if="third.account.displayName" class="winner-time">{{ third.time }}s</label>
                            <label v-else class="winner-time"> </label>
                        </div>
                    </div>
                </div>

                <div class="table-wrapper">
                    <div v-for="(score, index) in scoresTable" :key="index">
                        <table class="table-scores">
                            <tr v-if="score.account.displayName" class="table-row">
                                <td class="table-number">{{ 1 + index + currentTableIndex }}</td>
                                <td class="table-picture">
                                    <img
                                        alt="User profile picture"
                                        class="profile-picture-table"
                                        :src="'http://localhost:3000/' + score.account.profilePicture " />
                                </td>
                                <td class="table-name">{{ score.account.displayName }}</td>
                                <td class="table-points">{{ score.points }}p</td>
                                <td class="table-time">{{ score.time }}s</td>
                            </tr>
                        </table>
                    </div>
                    <div v-if="showUserScore">
                        <h3>Player Score</h3>
                        <table class="table-scores">
                            <tr class="table-row-user-score">
                                <td class="table-number">{{ 1 + userIndex }}</td>

                                <td class="table-picture">
                                    <img
                                        alt="User profile picture"
                                        class="profile-picture-table"
                                        src="/images/gubbe-left.svg" />
                                </td>
                                <td class="table-name">{{ userTableScore.account.displayName }}</td>
                                <td class="table-points">{{ userTableScore.points }}p</td>
                                <td class="table-time">{{ userTableScore.time }}s</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="buttons">
                <GeoButton v-if="hasPrevious" @click="previousTable">
                    <ArrowLeftThinCircleOutline class="icons" />
                    Back
                </GeoButton>
                <GeoButton v-else class="disabled">
                    <ArrowLeftThinCircleOutline class="icons" />
                    Back
                </GeoButton>

                <GeoButton v-if="hasNext" @click="nextTable">
                    More
                    <ArrowRightThinCircleOutline class="icons" />
                </GeoButton>
                <GeoButton v-else class="disabled">
                    More
                    <ArrowRightThinCircleOutline class="icons" />
                </GeoButton>
            </div>
            <div>
                <p>
                    Original crown svg published by
                    <a href="https://freesvg.org/by/OpenClipart"> OpenClipart</a>
                    from
                    <a href="https://freesvg.org/simplified-crown" target="_blank"> https://freesvg.org</a>
                </p>
            </div>
        </div>
    </main>
</template>

<style scoped>
.arrows {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.arrow-left {
    cursor: pointer;
}

.arrow-right {
    cursor: pointer;
}

.buttons {
    display: flex;
    gap: calc(var(--gap) * 2);
    width: 100%;
}

#crown {
    background: url(/images/crown.svg);
    background-size: cover;
    height: 80px;
    left: 42.5%;
    position: relative;
    top: -289px;
    transform: translate(-105%, 80%);
    width: 80px;
}

.daily-button-active {
    border-radius: var(--radius) 0 0 var(--radius);
    font-size: 1.125rem;
}

.daily-button-disabled {
    background: var(--color-light-blue);
    border-radius: var(--radius) 0 0 var(--radius);
    color: var(--color-black);
    font-size: 1.125rem;
}

h1,
h3 {
    text-align: center;
}

.icons {
    position: relative;
    top: 4px;
}

main {
    width: 90%;
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

#medallion-first {
    background: #c29b0c;
    left: -105px;
    position: relative;
    top: 5px;
}

#medallion-second {
    background: #71706e;
    left: -90px;
    position: relative;
    top: 5px;
}

#medallion-third {
    background: #804a00;
    left: -80px;
    position: relative;
    top: 5px;
}

.overall-button-active {
    border-radius: 0 var(--radius) var(--radius) 0;
    font-size: 1.125rem;
}

.overall-button-disabled {
    background: var(--color-light-blue);
    border-radius: 0 var(--radius) var(--radius) 0;
    color: var(--color-black);
    font-size: 1.125rem;
}

.overall-daily-buttons-wrapper {
    align-items: center;
    display: flex;
    flex-direction: row;
    width: 50%;
}

p {
    font-size: 0.65rem;
    margin: 0;
    width: 100%;
}

.profile-picture-div {
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
    width: 100%;
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

.profile-picture-table {
    align-items: center;
    background: var(--color-light-blue);
    border: 3px var(--color-blue) solid;
    border-radius: 40px;
    height: 60px;
    width: 60px;
}

#profile-picture-third {
    background: var(--color-light-blue);
    border: 5px var(--color-blue) solid;
    border-radius: 90px;
    height: 130px;
    width: 130px;
}

#profile-pictures-wrapper {
    margin-bottom: -80px;
    margin-top: 20px;
}

.subtitle {
    margin-top: 12px;
}

.table-number {
    padding-left: 10px;
    text-align: center;
    width: 25px;
}

.table-picture {
    width: 20%;
}

.table-points {
    text-align: right;
    width: 30%;
}

.table-name {
    width: 25%;
}

.table-row {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: var(--gap);
    width: 100%;
}

.table-row-user-score {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: var(--gap);
    padding: 0.5vh;
    width: 100%;
}

.table-scores {
    height: 50px;
    table-layout: fixed;
    width: 100%;
}

.table-time {
    margin-right: 10px;
    padding: 6px;
    text-align: right;
    width: 15%;
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
    gap: calc(var(--gap) * 3);
    justify-content: center;
    margin-bottom: 1vh;
    width: 100%;
}

.winner-name {
    height: 100%;
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
    width: 20%;
}

.winner-time {
    align-items: center;
    background: var(--color-light-blue);
    border-left-color: 1px var(--color-blue);
    border-left-style: solid;
    border-radius: 0 var(--radius) var(--radius) 0;
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
</style>