<script lang="ts" setup>
interface Props {
    size?: 'small' | 'medium' | 'large' | 'answer';
    color?: 'default' | 'green' | 'red';
    disabled?: boolean;
}

interface ButtonStyle {
    small: Style;
    medium: Style;
    large: Style;
    answer: Style;
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
    answer: {
        fontSize: '1.25rem',
        height: '100px',
    },
};

// eslint-disable-next-line vue/no-setup-props-destructure
const { size = 'medium', color = 'default', disabled = false } = defineProps<Props>();

const buttonHeight = button[size].height;
const buttonFontSize = button[size].fontSize;
const buttonColor = getColor();

function getColor() {
    switch (color) {
        case 'green':
            return 'var(--color-light-green)';
        case 'red':
            return 'var(--color-red)';
        default:
            return 'var(--color-blue)';
    }
}
</script>

<template>
    <button :class="{ disabled: disabled }" :disabled="disabled" class="button">
        <slot></slot>
    </button>
</template>

<style scoped>
.button {
    background: v-bind(buttonColor);
    border: none;
    border-radius: var(--radius);
    color: var(--color-white);
    font-size: v-bind(buttonFontSize);
    height: v-bind(buttonHeight);
    padding: 3px 6px;
    width: 100%;
}

.button:hover {
    background: var(--color-light-blue);
    color: var(--color-black);
    cursor: pointer;
}

.disabled {
    opacity: 0.75;
}

.disabled:hover {
    background-color: var(--color-blue);
    color: var(--color-white);
}
</style>
