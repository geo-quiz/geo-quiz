<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(false);
</script>

<template>
    <div class="item">
        <input
            id="cbx"
            v-model="value"
            class="inp-cbx"
            style="display: none"
            type="checkbox"
            @change="$emit('value', value)" />
        <label class="cbx" for="cbx">
            <span>
                <svg height="10px" viewbox="0 0 12 10" width="12px">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </svg>
            </span>
            <span>
                <slot></slot>
            </span>
        </label>
    </div>
</template>

<style scoped>
.cbx {
    cursor: pointer;
    margin: auto;
    -webkit-user-select: none;
    user-select: none;
}

.cbx span {
    display: inline-block;
    transform: translate3d(0, 0, 0);
    vertical-align: middle;
}

.cbx span:first-child {
    border: 2px solid var(--color-light-green);
    border-radius: 4px;
    height: 24px;
    position: relative;
    transform: scale(1);
    transition: all 0.2s ease;
    vertical-align: middle;
    width: 24px;
}

.cbx span:first-child svg {
    fill: none;
    left: 6px;
    position: absolute;
    stroke: var(--color-white);
    stroke-dasharray: 16px;
    stroke-dashoffset: 16px;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
    top: 7px;
    transform: translate3d(0, 0, 0);
    transition: all 0.3s ease;
    transition-delay: 0.1s;
}

.cbx span:first-child:before {
    background: var(--color-light-green);
    border-radius: 50%;
    content: '';
    display: block;
    height: 100%;
    opacity: 1;
    transform: scale(0);
    width: 100%;
}

.cbx span:last-child {
    padding-left: 12px;
}

.cbx:hover span:first-child {
    border-color: var(--color-light-green);
}

.inp-cbx:checked + .cbx span:first-child {
    animation: wave 0.4s ease;

    background: var(--color-light-green);
    border-color: var(--color-light-green);
}

.inp-cbx:checked + .cbx span:first-child svg {
    stroke-dashoffset: 0;
}

.inp-cbx:checked + .cbx span:first-child:before {
    opacity: 0;
    transform: scale(3.5);
    transition: all 0.6s ease;
}

@keyframes wave {
    50% {
        transform: scale(0.9);
    }
}
</style>
