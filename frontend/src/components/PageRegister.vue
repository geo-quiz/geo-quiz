<script lang="ts" setup>
import GeoButton from '@/components/GeoButton.vue';
import PageNotification from '@/components/PageNotification.vue';
import PageLoad from '@/components/PageLoad.vue';
import { ref } from 'vue';
import router from '@/router/index';

const displayName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isEqualPassword = ref(false);
const isPasswordValid = ref(false);
const passwordNotFilledOut = ref(true);
const isSubmitted = ref(false);
const awaitingResponse = ref(false);

const isErrorDisplayName = ref(false);
const errorDisplayName = ref('');

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

function checkErrors(res: Response) {
    console.log(res);
    const error = res.statusText;
    if (error == 'Password does not meet the requirements') {
        isErrorPassword.value = true;
        errorPassword.value = error;
        return;
    } else if (error == 'Password & Email do not meet the requirements') {
        isErrorEmail.value = true;
        errorEmail.value = 'Email does not meet the requirements';
        isErrorPassword.value = true;
        errorPassword.value = 'Password does not meet the requirements';
        return;
    } else if (error == 'Email is not valid') {
        isErrorEmail.value = true;
        errorEmail.value = error;
        return;
    } else if (error == 'Email already exists') {
        isErrorEmail.value = true;
        errorEmail.value = error;
        return;
    } else if (error == 'Display name already exists') {
        isErrorDisplayName.value = true;
        errorDisplayName.value = error;
        return;
    } else if (error == 'Email & Display Name already exists') {
        isErrorDisplayName.value = true;
        errorDisplayName.value = 'Display name already exists';
        isErrorEmail.value = true;
        errorEmail.value = 'Email already exists';
        return;
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
                    displayName: displayName.value,
                    email: email.value,
                    password: password.value,
                }),
                mode: 'cors',
            })
                .then((response) => {
                    if (response.ok) {
                        response.json().then(() => {
                            awaitingResponse.value = false;
                            isSubmitted.value = false;
                            router.push('/login');
                        });
                    } else {
                        checkErrors(response);
                        awaitingResponse.value = false;
                    }
                })
                .catch((error) => {
                    console.error(error);
                    awaitingResponse.value = false;
                });
        }
    }
}

function correctingDisplayName() {
    isErrorDisplayName.value = false;
}

function correctingEmail() {
    isErrorEmail.value = false;
}

function correctingPassword() {
    isErrorPassword.value = false;
}
</script>

<template>
    <main>
        <h2>Register</h2>
        <form id="register-form" @submit.prevent="submitIfValid">
            <div class="fields">
                <div class="field">
                    <label class="register-label" for="display-name">Display Name</label>
                    <input
                        id="display-name"
                        v-model="displayName"
                        autocomplete="off"
                        class="input"
                        name="display-name"
                        placeholder="Enter your display name..."
                        required
                        type="text"
                        @input="correctingDisplayName" />
                    <label v-if="isErrorDisplayName" class="error">{{ errorDisplayName }}</label>
                </div>
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
                    <span v-if="confirmPassword.length > 0" class="label-wrapper">
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
    </main>
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

h2 {
    color: var(--color-white);
    font-size: 2rem;
    margin: -8px 0;
    text-align: center;
    width: 100%;
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

main {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) * 2);
    justify-content: center;
    width: 90%;
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
</style>
