<script lang="ts" setup>
import MainMenuContainer from '@/components/MainMenuContainer.vue';
import PageHeader from '@/components/PageHeader.vue';
import PageLogin from '@/components/PageLogin.vue';
import PageFooter from '@/components/PageFooter.vue';</script>

<template>
    <div class="center-vertical">
        <MainMenuContainer noLogo>
            <PageHeader />
            <PageLogin />
            <PageFooter />
        </MainMenuContainer>
    </div>
</template>

<style scoped>

</style>
