<script lang="ts" setup>
import GeoButton from '@/components/GeoButton.vue';
import PageNotification from '@/components/PageNotification.vue';
import PageLoad from '@/components/PageLoad.vue';
import { ref } from 'vue';
import router from '@/router/index';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isEqualPassword = ref(false);
const isPasswordValid = ref(false);
const passwordNotFilledOut = ref(true);
const isSubmitted = ref(false);
const responseFromServer = ref('');
const awaitingResponse = ref(false);

const isErrorEmail = ref(false);
const errorEmail = ref('Invalid Email');

const isErrorPassword = ref(false);
const errorPassword = ref('Invalid password');

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{8,}$/;

function isValidPassword() {
    correctingPassword();
    if (confirmPassword.value.length > 0) {
        passwordNotFilledOut.value = false;
    }

    isEqualPassword.value = password.value === confirmPassword.value;

    if (!isEqualPassword.value) {
        errorPassword.value = 'Passwords do not match';
        return;
    }

    isPasswordValid.value = passwordPattern.test(password.value);

    if (!isPasswordValid.value) {
        errorPassword.value =
            'Password must contain at least 8 characters, including one lowercase letter, one uppercase letter and one number. Password must NOT contain any symbols.';
        return;
    }
}

function checkErrors() {
    const error = JSON.stringify(responseFromServer.value);
    if (error.includes('Password does not meet the requirements')) {
        isErrorPassword.value = true;
        errorPassword.value = 'Password does not meet the requirements';
        return;
    } else if (error.includes('Password & Email do not meet the requirements')) {
        isErrorEmail.value = true;
        errorEmail.value = 'Email is invalid';
        isErrorPassword.value = true;
        errorPassword.value = 'Password does not meet the requirements';
        return;
    } else if (error.includes('Email is not valid')) {
        isErrorEmail.value = true;
        errorEmail.value = 'Email is not valid';
        return;
    } else if (error.includes('Email already exists')) {
        isErrorEmail.value = true;
        errorEmail.value = 'Email is already in use';
        return;
    } else if (error.includes('Account created')) {
        router.push({ name: 'profile' });
    }
}

function submitIfValid() {
    if (awaitingResponse.value) {
        return;
    } else {
        awaitingResponse.value = true;
        isSubmitted.value = true;

        console.log('Sending request to server...');

        if (isEqualPassword.value) {
            fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value,
                }),
                mode: 'cors',
            })
                .then((response) => response.json())
                .then((data) => {
                    responseFromServer.value = data as string;
                    awaitingResponse.value = false;
                    isSubmitted.value = false;
                    checkErrors();
                    console.log(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }
}

function correctingEmail() {
    isErrorEmail.value = false;
}

function correctingPassword() {
    isErrorPassword.value = false;
}
</script>

<template>
    <form id="register-form" @submit.prevent="submitIfValid">
        <div class="fields">
            <div class="field">
                <label class="register-label" for="email">Email address</label>
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
                    @input="correctingEmail" />
                <label v-if="isErrorEmail" class="error">{{ errorEmail }}</label>
            </div>
            <div class="field">
                <label class="register-label" for="password">Password</label>
                <input
                    id="password"
                    v-model="password"
                    autocomplete="off"
                    class="input"
                    name="password"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{8,}$"
                    placeholder="Enter your password..."
                    required
                    title="Password must contain at least 8 characters, including one lowercase letter, one uppercase letter and one number. Password must not contain any symbols."
                    type="password"
                    @input="isValidPassword" />

                <label class="register-label" for="password">Confirm password</label>
                <input
                    v-model="confirmPassword"
                    autocomplete="off"
                    class="input"
                    name="password"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{8,}$"
                    placeholder="Enter your password..."
                    required
                    title="Password must contain at least 8 characters, including one lowercase letter, one uppercase letter and one number. Password must not contain any symbols."
                    type="password"
                    @input="isValidPassword" />
                <span class="label-wrapper" v-if="confirmPassword.length > 0">
                    <label
                        v-if="isErrorPassword || !isEqualPassword || passwordNotFilledOut || !isPasswordValid"
                        class="error">
                        {{ errorPassword }}
                    </label>
                </span>
            </div>
        </div>
        <div class="register">
            <GeoButton color="green"> Register</GeoButton>
        </div>
        <div class="existing-user">
            <p>
                Already a user?
                <RouterLink to="/login">Login to your account.</RouterLink>
            </p>
        </div>
        <PageNotification v-if="awaitingResponse">
            <div id="notification-wrapper">
                <PageLoad />
            </div>
        </PageNotification>
    </form>
</template>

<style scoped>
a {
    color: var(--color-light-green);
    text-decoration: none;
}

.field {
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) / 2);
}

.fields {
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) * 3);
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

.existing-user {
    display: flex;
    justify-content: center;
}

#notification-wrapper {
    align-items: center;
    background: var(--color-dark-blue);
    border-radius: var(--radius);
    display: flex;
    height: 175px;
    justify-content: center;
    width: 80%;
}

.register {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-top: 40px;
}

.register-label {
    color: var(--color-white);
    margin-top: calc(var(--gap) / 2);
}

#register-form {
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) * 2);
    margin-top: 150px;
    width: 90%;
}

.label-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
}

.error {
    color: var(--color-red);
    font-size: 1rem;
    margin: 0;
    padding: 0;
    text-align: center;
}

@media only screen and (min-width: 768px) {
    #register-form {
        width: 75%;
    }
}

@media only screen and (min-width: 1024px) {
    #register-form {
        width: 50%;
    }
}
</style>
