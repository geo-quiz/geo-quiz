<script lang="ts" setup>
import MainMenuContainer from '@/components/MainMenuContainer.vue';
import PageHeader from '@/components/PageHeader.vue';
import PageRegister from '@/components/PageRegister.vue';
import PageFooter from '@/components/PageFooter.vue';</script>

<template>
    <div class="center-vertical">
        <MainMenuContainer noLogo>
            <PageHeader />
            <PageRegister />
            <PageFooter />
        </MainMenuContainer>
    </div>
</template>

<style scoped></style>
