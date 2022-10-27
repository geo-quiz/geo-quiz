<script lang="ts" setup>
import GeoButton from '@/components/GeoButton.vue';
import PageLoad from '@/components/PageLoad.vue';
import PageNotification from '@/components/PageNotification.vue';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import router from '@/router/index';

const email = ref('');
const password = ref('');
const loginError = ref(false);
const rememberMe = ref(false);
const awaitingResponse = ref(false);
const errorResponse = ref('');

function login() {
    const authStore = useAuthStore();
    awaitingResponse.value = true;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
        }),
    })
        .then((res) => {
            if (!res.ok) {
                console.log('statusText ', res);
                throw Error(res.statusText);
            }
            return res.json();
        })
        .then((data: any) => {
            if (rememberMe.value) {
                localStorage.setItem('token', data.accessToken);
                sessionStorage.removeItem('token');
            } else {
                sessionStorage.setItem('token', data.accessToken);
                localStorage.removeItem('token');
            }
            router.push('/home');
            awaitingResponse.value = false;
        })
        .catch((error) => {
            errorResponse.value = error;
            loginError.value = true;
            awaitingResponse.value = false;
        });

    let possibleToken = localStorage.getItem('token');
    if (possibleToken) {
        authStore.setToken(possibleToken);
    }
    possibleToken = sessionStorage.getItem('token');
    if (possibleToken) {
        authStore.setToken(possibleToken);
    }
}
</script>

<template>
    <main>
        <h2>Sign in</h2>
        <form class="login-form" @submit.prevent="login">
            <p v-if="loginError" class="error">{{ errorResponse }}</p>
            <div class="fields">
                <div class="field">
                    <label class="login-label" for="email">Email address</label>
                    <input
                        id="email"
                        v-model="email"
                        autocomplete="off"
                        class="input"
                        name="email"
                        pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
                        placeholder="Enter your email address..."
                        required
                        title="Must be a valid email address. (Example@email.com)."
                        type="email" />
                </div>
                <div class="field">
                    <label class="login-label" for="password">Password</label>
                    <input
                        id="password"
                        v-model="password"
                        class="input"
                        name="password"
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                        placeholder="Enter your password..."
                        required
                        title="Password format invalid."
                        type="password"
                        autocomplete="off" />
                </div>
                <RouterLink to="/forgot-password">Forgot your password?</RouterLink>
            </div>
            <div class="login">
                <div class="item">
                    <input id="cbx" v-model="rememberMe" class="inp-cbx" style="display: none" type="checkbox" />
                    <label class="cbx" for="cbx">
                        <span>
                            <svg height="10px" viewbox="0 0 12 10" width="12px">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                            </svg>
                        </span>
                        <span>Remember me?</span>
                    </label>
                </div>
                <GeoButton id="login-button" color="green">Login</GeoButton>
                <div class="new-user">
                    <p>
                        New user?
                        <RouterLink to="/register">Create an account.</RouterLink>
                    </p>
                </div>
            </div>
        </form>
    </main>
    <PageNotification v-if="awaitingResponse">
        <div id="notification-wrapper">
            <PageLoad />
        </div>
    </PageNotification>
</template>

<style scoped>
a {
    color: var(--color-light-green);
    text-decoration: none;
}

#email.input {
    background: #dbe2ef;
    color: var(--color-black);
}

.error {
    color: var(--color-red);
}

.field {
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) / 2);
    width: 100%;
}

.fields {
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) * 3);
    width: 100%;
}

h2 {
    color: var(--color-white);
    font-size: 2rem;
    text-align: center;
    width: 100%;
    margin: -8px 0;
}

.input {
    border: 0;
    border-radius: 10px;
    font-size: 1rem;
    height: 50px;
    margin: 0.5% 0;
    padding-left: 10px;
}

.login {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-top: 40px;
}

.login-label {
    color: var(--color-white);
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) * 2);
    width: 100%;
}

main {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) * 2);
    justify-content: center;
    width: 90%;
}

.new-user {
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

#password.input {
    background: #dbe2ef;
}

/*Rules for checkbox*/
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