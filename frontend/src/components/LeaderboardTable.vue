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
let overall = ref(true);
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

    overall.value = false;
}
function getOverallBoard() {
    // setScoresTable();
    overall.value = true;
}
</script>

<template>
    <main>
        <h1>Leaderboard</h1>

        <div class="wrapper">
            <div class="arrows">
                <div class="arrow-left">
                    <ChevronLeft></ChevronLeft>
                </div>
                <h3 class="subtitle">WORLD</h3>
                <div class="arrow-right">
                    <ChevronRight></ChevronRight>
                </div>
            </div>

            <div class="overall-daily-buttons-wrapper">
                <GeoButton class="overall-button" font-size="1.125rem" @click="getOverallBoard()"> Overall </GeoButton>
                <GeoButton class="daily-button" font-size="1.125rem" @click="getDailyBoard()"> Daily </GeoButton>
            </div>

            <div class="table-wrapper">
                background
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
.overall-daily-buttons-wrapper {
    align-items: center;
    display: flex;
    flex-direction: row;
    width: 50%;
}

.previous-next-buttons-wrapper {
    justify-content: space-between;
    display: flex;
    width: 40%;
}
.daily-button {
    border-radius: 0 var(--radius) var(--radius) 0;
}
.overall-button {
    border-radius: var(--radius) 0 0 var(--radius);
}

h1,
h3 {
    text-align: center;
}
main {
    width: 100%;
}

.subtitle {
    margin-top: -5px;
}
.table-wrapper {
    background: var(--color-white);
    color: var(--color-black);
    border: none;
    border-radius: var(--radius);
    padding: 3px 6px;
    width: 100%;
}
.wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) * 2);
    width: 100%;
}
</style>
