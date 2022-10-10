<script lang="ts" setup>
import PageHeader from './components/PageHeader.vue';</script>

<template>
  <PageHeader/>
  <RouterView/>
</template>

<style>
@font-face {
  font-family: "Avigea";
  src: local("Avigea"), url('/fonts/Avigea.ttf') format("truetype");
}
</style>
