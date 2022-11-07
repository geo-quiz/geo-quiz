<script lang="ts" setup>
import Door from 'vue-material-design-icons/Door.vue';
import DoorOpen from 'vue-material-design-icons/DoorOpen.vue';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import PageNotification from '@/components/PageNotification.vue';
import PageLoad from '@/components/PageLoad.vue';
import GeoButton from '@/components/GeoButton.vue';

const isHovering = ref(false);
const authStore = useAuthStore();
const isAwaitingResponse = ref(false);
const failed = ref(false);

function logout() {
    isAwaitingResponse.value = true;
    authStore
        .logout()
        .then(() => {
            failed.value = false;
            isAwaitingResponse.value = false;
        })
        .catch((error) => {
            console.error(error);
            failed.value = true;
            isAwaitingResponse.value = false;
        });
}
</script>

<template>
    <div class="logout-door">
        <Door
            :size="48"
            fillColor="var(--color-white)"
            @mouseover="isHovering = true"
            v-if="!isHovering"
            @click="logout" />
        <DoorOpen :size="48" fillColor="var(--color-white)" @mouseleave="isHovering = false" v-else @click="logout" />
    </div>

    <PageNotification v-if="isAwaitingResponse || failed">
        <div id="notification-wrapper">
            <div v-if="isAwaitingResponse" class="wrapper">
                <PageLoad />
            </div>
            <div v-if="failed" class="wrapper">
                <p>
                    Failed to log out <br />
                    Try again
                </p>
                <div class="button-wrapper">
                    <GeoButton @click="failed = false" size="small">Ok</GeoButton>
                </div>
            </div>
        </div>
    </PageNotification>
</template>

<style scoped>
.button-wrapper {
    width: 50%;
}

.logout-door {
    position: absolute;
    top: calc(var(--gap) * 3 + 6px);
    right: calc(var(--gap) * 3);
}

#notification-wrapper {
    align-items: center;
    background: var(--color-dark-blue);
    border-radius: var(--radius);
    display: flex;
    height: 175px;
    justify-content: center;
    width: 300px;
}

p {
    margin: 0;
    text-align: center;
}

.wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: var(--gap);
}
</style>
