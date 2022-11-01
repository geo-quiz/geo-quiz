<script lang="ts" setup>
import Door from 'vue-material-design-icons/Door.vue';
import DoorOpen from 'vue-material-design-icons/DoorOpen.vue';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const isHovering = ref(false);
const authStore = useAuthStore();

function logout() {
    authStore.logout();
}
</script>

<template>
    <div class="logout-door">
        <Door :size="48" fillColor="var(--color-white)" @mouseover="isHovering = true" v-if="!isHovering"
              @click="logout" />
        <DoorOpen :size="48" fillColor="var(--color-white)" @mouseleave="isHovering = false" v-else @click="logout" />
    </div>
</template>

<style scoped>
.logout-door {
    position: absolute;
    top: calc(var(--gap) * 3 + 6px);
    right: calc(var(--gap) * 3);
}
</style>
