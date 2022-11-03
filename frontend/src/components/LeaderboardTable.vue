<script lang="ts" setup>
import GeoButton from '@/components/GeoButton.vue';

//import { useCurrentLeaderboardStore } from '@/stores/currentLeaderboard';
import { ref } from 'vue';
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';

// import router from '@/router/index';
//
// const props = defineProps({
//     id: {
//         type: String,
//         required: true,
//     },
// });
//
let isOverall = ref(true);
//const leaderboard = useCurrentLeaderboardStore();
// const nrOfLeaderboards = ref(0);
//
// onMounted(() => {
//     fetch(`http://localhost:3000/leaderboard/${props.id}`)
//         .then((response) => response.json())
//         .then((data) => {
//             leaderboard.setLeaderboards(data);
//             nrOfLeaderboards.value = leaderboard.scores.length;
//         })
//         .catch(() => {
//             router.back();
//             alert('Something went wrong, please try again');
//         });
// });

// function previousLeaderboard() {
//     leaderboard.previousLeaderboard();
// }
//
// function nextLeaderboard() {
//     leaderboard.nextLeaderboard();
// }
//
// function getSubtitle() {
//     switch (leaderboard.currentLeaderboard.continent.toString()) {
//         case 'europe':
//             return 'EUROPE';
//         case 'asia':
//             return 'ASIA';
//         case 'africa':
//             return 'AFRICA';
//         case 'north-america':
//             return 'NORTH AMERICA';
//         case 'south-america':
//             return 'SOUTH AMERICA';
//         case 'oceania':
//             return 'OCEANIA';
//         case 'world':
//             return 'WORLD';
//         default:
//             return 'UNKNOWN';
//     }
//}
function getDailyBoard() {
    //setScoresTable(leaderboard.currentLeaderboard);

    isOverall.value = false;
}

function getOverallBoard() {
    // setScoresTable();
    isOverall.value = true;
}
</script>

<template>
    <main>
        <h1>Leaderboard</h1>

        <div class="wrapper">
            <div class="arrows">
                <div class="arrow-left">
                    <ChevronLeft size="50"></ChevronLeft>
                </div>
                <h3 class="subtitle">WORLD</h3>
                <div class="arrow-right">
                    <ChevronRight size="50"></ChevronRight>
                </div>
            </div>

            <div class="overall-daily-buttons-wrapper">
                <GeoButton v-if="isOverall" class="overall-button-disabled" font-size="1.125rem" >Overall</GeoButton>
                <GeoButton v-else class="overall-button-active" font-size="1.125rem" @click="getOverallBoard()">Overall</GeoButton>

                <GeoButton v-if="isOverall" class="daily-button-active" font-size="1.125rem" @click="getDailyBoard()">Daily</GeoButton>
                <GeoButton v-else class="daily-button-disabled" font-size="1.125rem">Daily</GeoButton>
            </div>


                <img id="crown" src="/images/crown.svg" alt="Winner's crown." />


            <div id="profile-pictures-wrapper" class="field">
                <div class="profile-picture-div">
                    <img id="profile-picture-second" src="/images/gubbe-left.svg" alt="Second place profile picture" />
                    <label class="medallion" id="medallion-second">2</label>
                    <img id="profile-picture-first" src="/images/default-profile-picture.svg" alt="First place profile picture" />
                    <label class="medallion" id="medallion-first">1</label>
                    <img id="profile-picture-third" src="/images/gubbe-right.svg" alt="Third place profile picture" />
                    <label class="medallion" id="medallion-third">3</label>
                </div>
            </div>
            <div class="medallion-wrapper">
                <div class="medallion-div">



                </div>
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
                <table v-if="overall" id="overallTable">
                    <tr>
                        getScoresTable() Overall
                    </tr>
                </table>
                <table v-else id="dailyTable">
                    <tr>
                        getScoresTable() Daily
                    </tr>
                </table>
            </div>

            <!--        <section v-if="leaderboard.currentLeaderboard">-->
            <!--            <h3 class="subtitle">{{ getSubtitle() }}</h3>-->
            <!--            <GeoButton id="overall-button" font-size="1.125rem" @click="previousLeaderboard">-->
            <!--                Previous board-->
            <!--            </GeoButton>-->
            <!--            <GeoButton id="daily-button" font-size="1.125rem" @click="nextLeaderboard"> Next board </GeoButton>-->

            <!--            <div class="leaders-table">-->
            <!--                <div-->
            <!--                    v-for="(score, index) in leaderboard.currentLeaderboard.userScores"-->
            <!--                    :key="index"-->
            <!--                    class="table-wrapper">-->
            <!--                    <table>-->
            <!--                        <tr>-->
            <!--                            <th>{{ score.avatarUrl }}</th>-->
            <!--                            <th>{{ score.displayName }}</th>-->
            <!--                            <th>{{ score.points }}</th>-->
            <!--                            <th>{{ score.time }}</th>-->
            <!--                        </tr>-->
            <!--                    </table>-->
            <!--                </div>-->
            <!--            </div>-->
            <!--        </section>-->
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
}

.arrow-right {
}

.crown-wrapper {

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
    background: var(--color-light-blue);
    border-radius: var(--radius) 0 0 var(--radius);
    color: var(--color-black);
    height: 150%;
    text-align: center;
    width: 100%;
}

.winner-stats {
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) * 2);
    justify-content: center;
}

.winner-time {
    background: var(--color-blue);
    border-radius: 0 var(--radius) var(--radius) 0;
    color: var(--color-light-blue);
    height: 150%;
    text-align: center;
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
