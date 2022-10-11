<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router';</script>

<template>
    <header>
        <div class="wrapper">
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/quiz">Quiz</RouterLink>
            </nav>
        </div>
    </header>

    <RouterView />
</template>

<style scoped>

</style>
