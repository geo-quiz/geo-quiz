<script lang="ts" setup>
import GeoButton from '@/components/GeoButton.vue';
import { computed, onMounted, Ref, ref } from 'vue';
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';
import PageLoad from '@/components/PageLoad.vue';
import router from '@/router/index';
import type { ILeaderboard } from '@/utility/interfaces/ILeaderboard';
import type { IScore } from '@/utility/interfaces/IScore';
import { useRoute } from 'vue-router';

const defaultScore = { id: -1, points: -1, time: -1, displayName: '' } as IScore;

const awaitingResponse = ref(false);

const route = useRoute();
console.log('continent ', route.params.continent);

let currentContinent: string = route.params.continent as string;
console.log('currentContinent ', currentContinent);

const continents = ['africa', 'asia', 'europe', 'north-america', 'oceania', 'south-america', 'world'];

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

let scores: Ref<IScore[]> = ref([]);

let first: Ref<IScore> = ref(defaultScore);
let second: Ref<IScore> = ref(defaultScore);
let third: Ref<IScore> = ref(defaultScore);
let scoresTable: Ref<IScore[]> = ref([]);
scoresTable.value[0] = defaultScore;

let isOverall = ref(true);
let showUserScore = ref(false);
let userIndex = ref(-1);
let userTableScore = ref(defaultScore);


function getLeaderboards(newContinent: string) {
    console.log('in getLeadersboards');
    fetch(`http://localhost:3000/leaderboard/${newContinent}`)
        .then((response) =>
            response.json().then((data: { continentBoards: ILeaderboard[]; userScore: ILeaderboard[] }) => {
                leaderboards.value = data.continentBoards;
                userScores.value = data.userScore;
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
        default:
            return 'UNKNOWN';
    }
}

function getPrevious() {
    let previousIndex = continents.findIndex((continent) => continent === currentContinent) - 1;
    if (previousIndex < 0) {
        previousIndex = 6;
    }
    const nextContinent = continents[previousIndex];
    loadContinent(nextContinent);
    getLeaderboards(currentContinent);
}

function loadContinent(nextContienent: any) {
    awaitingResponse.value = true;
    getLeaderboards(nextContienent);
    currentContinent = nextContienent;
    setTimeout(() => {
        getDailyBoard();
        awaitingResponse.value = false;
    }, 1000);
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
    first.value = defaultScore;
    second.value = defaultScore;
    third.value = defaultScore;
    scoresTable.value[0] = defaultScore;
}

function setupScoresAndTable() {
    resetScores();
    if (scores.value[0]) {
        first.value = scores.value[0];
    } else {
        console.log('no value in scores[0]');
    }
    if (scores.value[1]) {
        second.value = scores.value[1];
    } else {
        console.log('no value in scores[1]');
    }
    if (scores.value[2]) {
        third.value = scores.value[2];
    } else {
        console.log('no value in scores[2]');
    }
    if (scores.value[0]) {
        scoresTable.value = scores.value.slice(3);
    } else {
        console.log('no values left in scores to assign to scoresTable');
    }
    console.log('daily scores assigned');
    console.log('first ', first.value?.displayName);
    console.log('second ', second.value?.displayName);
    console.log('third ', third.value?.displayName);
}

function getDailyBoard() {
    console.log('start getDailyBoard()');

    if (dailyLeaderboard.value) {
        console.log('dailyBoard has data');
        if (dailyLeaderboard.value.scores) {
            scores.value = dailyLeaderboard.value.scores;
            setupScoresAndTable();
        } else {
            console.log('no value in dailyLeaderboard scores');
        }
    } else {
        console.log('no value in dailyLeaderboard');
    }
    console.log('daily scoresTable ', scoresTable.value);

    isOverall.value = false;

    if (dailyUserScore.value) {
        if (isInScoresTable(dailyUserScore.value)) {
            showUserScore.value = true;
        }
    } else {
        showUserScore.value = false;
    }
}

function getOverallBoard() {
    console.log('start getoverallBoard()');
    if (overallLeaderboard.value) {
        console.log('overallBoard has data');
        if (overallLeaderboard.value.scores) {
            scores.value = overallLeaderboard.value.scores;
            setupScoresAndTable();
        } else {
            console.log('no value in overallLeaderboard scores');
        }
    } else {
        console.log('no value in overallLeaderboard');
    }

    console.log('overall scores ', scores.value);

    isOverall.value = true;

    if (overallUserScore.value) {
        if (isInScoresTable(overallUserScore.value)) {
            showUserScore.value = true;
        }
    } else {
        showUserScore.value = false;
    }
}

function isInScoresTable(userScore: ILeaderboard) {
    let isInList = ref(false);
    for (let i = 0; i < scoresTable.value.length; i++) {
        if (userScore.scores[0].displayName != scoresTable.value[i].displayName) {
            isInList.value = true;
        }
    }
    if (isInList.value) {
        for (let i = 0; i < scoresTable.value.length; i++) {
            if (userScore.scores[0].displayName == scoresTable.value[i].displayName) {
                userIndex.value = i+3;
                userTableScore.value.displayName = scoresTable.value[i].displayName;
                userTableScore.value.points = scoresTable.value[i].points;
                userTableScore.value.time = scoresTable.value[i].time;
                console.log('i ',i)
            }
        }
    }
    else {
        userTableScore.value = defaultScore;
    }
    console.log('userIndex: ', userIndex);

    return isInList;
}


</script>

<template>
    <main>
        <h1>Leaderboard</h1>

        <div class="wrapper">
            <div class="arrows">
                <div class="arrow-left" @click="getPrevious()">
                    <ChevronLeft size="50"></ChevronLeft>
                </div>
                <h3 class="subtitle" v-if="!awaitingResponse">{{ getSubtitle() }}</h3>
                <div class="arrow-right" @click="getNext()">
                    <ChevronRight size="50"></ChevronRight>
                </div>
            </div>

            <div class="overall-daily-buttons-wrapper">
                <GeoButton v-if="isOverall" class="daily-button-active" @click="getDailyBoard"> Daily </GeoButton>
                <GeoButton v-else class="daily-button-disabled">Daily</GeoButton>

                <GeoButton v-if="isOverall" class="overall-button-disabled">Overall</GeoButton>
                <GeoButton v-else class="overall-button-active" @click="getOverallBoard"> Overall </GeoButton>
            </div>
            <PageLoad v-if="awaitingResponse" />
            <div v-else class="wrapper">
                <div id="profile-pictures-wrapper">
                    <div class="profile-picture-div">
                        <img
                            id="profile-picture-second"
                            alt="Second place profile picture"
                            src="/images/gubbe-left.svg" />
                        <label id="medallion-second" class="medallion">2</label>
                        <img
                            id="profile-picture-first"
                            alt="First place profile picture"
                            src="/images/default-profile-picture.svg" />
                        <label id="medallion-first" class="medallion">1</label>
                        <img
                            id="profile-picture-third"
                            alt="Third place profile picture"
                            src="/images/gubbe-right.svg" />
                        <label id="medallion-third" class="medallion">3</label>
                    </div>
                    <div id="crown"></div>
                </div>
                <div class="medallion-wrapper">
                    <div class="medallion-div"></div>
                </div>

                <div class="winner-container">
                    <div class="winner-stats">
                        <label class="winner-name">{{ second.displayName }}</label>
                        <div class="winner-time-points">
                            <label class="winner-points" v-if="second.displayName">{{ second.points }}p</label>
                            <label class="winner-points" v-else> </label>
                            <label class="winner-time" v-if="second.displayName">{{ second.time }}s</label>
                            <label class="winner-time" v-else> </label>
                        </div>
                    </div>
                    <div class="winner-stats">
                        <label class="winner-name">{{ first.displayName }}</label>
                        <div class="winner-time-points">
                            <label class="winner-points" v-if="first.displayName">{{ first.points }}p</label>
                            <label class="winner-points" v-else> </label>
                            <label class="winner-time" v-if="first.displayName">{{ first.time }}s</label>
                            <label class="winner-time" v-else> </label>
                        </div>
                    </div>
                    <div class="winner-stats">
                        <label class="winner-name">{{ third.displayName }}</label>
                        <div class="winner-time-points">
                            <label class="winner-points" v-if="third.displayName">{{ third.points }}p</label>
                            <label class="winner-points" v-else> </label>
                            <label class="winner-time" v-if="third.displayName">{{ third.time }}s</label>
                            <label class="winner-time" v-else> </label>
                        </div>
                    </div>
                </div>

                <div class="table-wrapper">
                    <div v-for="(score, index) in scoresTable" :key="index">
                        <table class="table-scores">
                            <tr class="table-row" v-if="score.displayName">
                                <td class="table-number">{{ 4 + index }}</td>
                                <td class="table-picture">
                                    <img
                                        alt="User profile picture"
                                        class="profile-picture-table"
                                        src="/images/gubbe-left.svg" />
                                </td>
                                <td class="table-name">{{ score.displayName }}</td>
                                <td class="table-points">{{ score.points }}p</td>
                                <td class="table-time">{{ score.time }}s</td>
                            </tr>
                        </table>
                    </div>
                    <div v-if="showUserScore">
                        <h3>Overall Board & showUserScore </h3>
                        <table class="table-scores">
                            <tr class="table-row-user-score">
                                <td class="table-number">{{ 1 + userIndex }}</td>

                                <td class="table-picture">
                                    <img
                                        alt="User profile picture"
                                        class="profile-picture-table"
                                        src="/images/gubbe-left.svg" />
                                </td>
                                <td class="table-name">{{ userTableScore.displayName }}</td>
                                <td class="table-points">{{ userTableScore.points }}p</td>
                                <td class="table-time">{{ userTableScore.time }}s</td>
                            </tr>
                        </table>
                    </div>
                </div>
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
    background-color: var(--color-green);
    display: flex;
    flex-direction: row;
    gap: var(--gap);
    padding: .5vh;
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
    border-radius: var(--radius) var(--radius) 0 0;
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
    text-align: center;
    height: 100%;
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
