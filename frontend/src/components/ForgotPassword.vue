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
                    v-model="email"
                    autocomplete="off"
                    class="input"
                    name="email"
                    pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
                    placeholder="Enter your email address..."
                    required
                    title="Must be a valid email address. (Example@email.com)."
                    type="email"
                    @input="isInvalidEmail = false" />
                <label v-if="isInvalidEmail" id="email-error">Invalid email</label>
            </div>
            <GeoButton color="green" @click.prevent="sendEmail">Reset password</GeoButton>
        </form>
    </div>

    <div v-else class="wrapper">
        <p id="sent-text">
            Email would have been sent to the provided email <br />
            if we had implemented it...
        </p>
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
    color: var(--color-red);
    text-align: center;
    width: 100%;
}

.field {
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) / 2);
}

.input {
    background: #dbe2ef;
    border: none;
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
    text-align: center;
}

.wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
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
