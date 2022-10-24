<script lang="ts" setup>
import GeoButton from '@/components/GeoButton.vue';
import { ref } from 'vue';

const isEmailSent = ref(false);
const isInvalidEmail = ref(false);
const email = ref('');

const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/;

function sendEmail() {
    const isValidEmail = emailPattern.test(email.value);
    if (isValidEmail) {
        isEmailSent.value = true;
    } else {
        isInvalidEmail.value = true;
    }
}
</script>

<template>
    <div v-if="!isEmailSent" class="wrapper">
        <h2 id="title">Send password reset link</h2>
        <form id="reset-password-form">
            <div class="field">
                <label class="reset-password-label" for="email">Email address</label>
                <input
                    id="email"
                    autocomplete="off"
                    class="input"
                    name="email"
                    pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
                    placeholder="Enter your email address..."
                    required
                    title="Must be a valid email address. (Example@email.com)."
                    type="email"
                    v-model="email" />
                <label v-if="isInvalidEmail" id="email-error">Invalid email</label>
            </div>
            <GeoButton color="green" @click.prevent="sendEmail">Reset password</GeoButton>
        </form>
    </div>

    <div v-else class="wrapper">
        <p id="sent-text">Email has been sent to the provided email</p>
    </div>
</template>

<style scoped>
#title {
    margin-top: 140px;
}

a {
    color: var(--color-light-green);
    text-decoration: none;
}

#email-error {
    width: 100%;
    text-align: center;
    color: var(--color-red);
}

.field {
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) / 2);
}

.input {
    background: #dbe2ef;
    border: 0;
    border-radius: 10px;
    color: var(--color-black);
    font-size: 1rem;
    height: 50px;
    margin: 0.5% 0;
    padding-left: 10px;
}

#reset-password-form {
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) * 2);
    width: 90%;
}

#sent-text {
    margin-bottom: calc(var(--gap) * 3);
}

.wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

@media only screen and (min-width: 768px) {
    #reset-password-form {
        width: 75%;
    }
}

@media only screen and (min-width: 1024px) {
    #reset-password-form {
        width: 50%;
    }
}
</style>