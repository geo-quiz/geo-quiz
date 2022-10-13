<script lang="ts" setup>
interface Props {
    size?: 'small' | 'medium' | 'large';
    color?: 'default' | 'green';
}

interface ButtonStyle {
    small: Style;
    medium: Style;
    large: Style;
}

interface Style {
    fontSize: string;
    height: string;
}

const button: ButtonStyle = {
    small: {
        fontSize: '1.25rem',
        height: '50px',
    },
    medium: {
        fontSize: '1.5rem',
        height: '75px',
    },
    large: {
        fontSize: '1.75rem',
        height: '100px',
    },
};

// eslint-disable-next-line vue/no-setup-props-destructure
const { size = 'medium', color = 'default' } = defineProps<Props>();

const buttonHeight = button[size].height;
const buttonFontSize = button[size].fontSize;
const buttonColor = color === 'green' ? '#5bb318' : '#3f72af';
</script>

<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<style scoped>
.button {
    background: v-bind(buttonColor);
    border: none;
    border-radius: var(--radius);
    color: #f9f7f7;
    font-size: v-bind(buttonFontSize);
    height: v-bind(buttonHeight);
    padding: 3px 6px;
    width: 100%;
}

button:hover {
    background: #f9f7f7;
    color: #111111;
    cursor: pointer;
}
</style>
