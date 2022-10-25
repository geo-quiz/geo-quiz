<script lang="ts" setup>
import MainMenuContainer from '@/components/MainMenuContainer.vue';
import PageHeader from '@/components/PageHeader.vue';
import PageRegister from '@/components/PageRegister.vue';
import PageFooter from '@/components/PageFooter.vue';
</script>

<template>
    <MainMenuContainer noLogo>
        <PageHeader />
        <PageRegister />
        <PageFooter />
    </MainMenuContainer>
</template>

<style scoped></style>
