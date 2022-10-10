<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref} from 'vue';

const isTouchScreen = ref(true);
const TOUCHSCREEN_MAX_WIDTH = 1024;

function onResize() {
  isTouchScreen.value = isTouchScreen.value === window.innerWidth < TOUCHSCREEN_MAX_WIDTH;
  console.log(window.innerWidth);
}

onMounted(() => {
  window.addEventListener('resize', onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});
</script>

<template>
  <section class='header-background'>
    <div>
      <button v-if="isTouchScreen" class="hamburger-menu">
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </button>

      <nav v-if="!isTouchScreen">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/quiz">Quiz</RouterLink>
        <RouterLink to="/next">Next</RouterLink>
      </nav>
    </div>
    <div class="header-title">
      <h1>GeoQuiz</h1>
    </div>
  </section>
</template>

<style scoped>
* {
  --radius: 5px;
}

h1 {
  color: #f9f7f7;
  font-family: 'Avigea', 'serif';
  font-size: 35px;
}

.hamburger-menu {
  width: 50px;
  height: 50px;
  background: #3f72af;
  border-radius: 50%;
  border: #f9f7f7 solid 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header-title {
  width: 34%;
  display: flex;
  justify-content: center;
}

.line {
  display: block;
  height: 3px;
  margin: 3px 0;
  width: 75%;
  background: #f9f7f7;
  border-radius: var(--radius);
}

.header-background {
  background: #3f72af;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  min-width: 320px;
}

section {
  display: flex;
  justify-content: space-evenly;
}
</style>