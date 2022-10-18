<script lang="ts" setup>
import GeoButton from '@/components/GeoButton.vue';
import { ref } from 'vue';

const password = ref('');
const confirmPassword = ref('');
const isEqualPassword = ref(false);
const isButtonClicked = ref(false);

function checkPassword() {
    isEqualPassword.value = password.value === confirmPassword.value && password.value.length >= 8;
    console.log(isEqualPassword.value);
}

function submitIfValid() {
    isButtonClicked.value = true;
    if (isEqualPassword.value) {
        const form = document.querySelector('#register-form') as HTMLFormElement;
        if (form) {
            form.submit();
        }
    }
}
</script>
<template>
    <form id="register-form">
        <div class="fields">
            <div class="field">
                <label class="register-label" for="email">Email address</label>
                <input
                    id="email"
                    autocomplete="off"
                    class="input"
                    name="email"
                    pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
                    placeholder="Enter your email address..."
                    required
                    title="Must be a valid email address. (Example@email.com)."
                    type="email" />
            </div>
            <div class="field">
                <label class="register-label" for="password">Password</label>
                <input
                    id="password"
                    v-model="password"
                    class="input"
                    name="password"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{8,}$"
                    placeholder="Enter your password..."
                    required
                    title="Password must contain at least 8 characters, including one lowercase letter, one uppercase letter and one number. Password must not contain any symbols."
                    type="password"
                    @input="checkPassword" />
            </div>
            <div class="field">
                <label class="register-label" for="password">Confirm password</label>
                <input
                    v-model="confirmPassword"
                    class="input"
                    name="password"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{8,}$"
                    placeholder="Enter your password..."
                    required
                    title="Password must contain at least 8 characters, including one lowercase letter, one uppercase letter and one number. Password must not contain any symbols."
                    type="password"
                    @input="checkPassword" />
            </div>
        </div>
        <div class="register">
            <label v-if="isButtonClicked" class="password-match">Passwords do not match.</label>
            <GeoButton color="green" @click.prevent="submitIfValid">Register</GeoButton>
        </div>
        <div class="existing-user">
            <p>
                Already a user?
                <RouterLink to="/login">Login to your account.</RouterLink>
            </p>
        </div>
    </form>
</template>

<style scoped>
a {
    color: var(--color-green);
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

.register {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-top: 40px;
}

.register-label {
    color: var(--color-white);
}

#register-form {
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) * 2);
    margin-top: 100px;
    width: 90%;
}

.password-match {
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
