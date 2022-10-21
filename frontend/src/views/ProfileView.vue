<script lang="ts" setup>
import MainMenuContainer from '@/components/MainMenuContainer.vue';
import PageHeader from '@/components/PageHeader.vue';
import ProfileEditor from '@/components/ProfileEditor.vue';
import PageFooter from '@/components/PageFooter.vue';</script>

<template>
    <MainMenuContainer noLogo>
        <PageHeader />
        <ProfileEditor />
        <PageFooter />
    </MainMenuContainer>
</template>

<style scoped>
</style>
