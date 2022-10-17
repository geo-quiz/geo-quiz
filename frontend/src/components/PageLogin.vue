<script lang="ts" setup>
import GeoButton from '@/components/GeoButton.vue';</script>

<template>
    <form class="login-form">
        <div class="fields">
            <div class="field">
                <label class="login-label" for="email">Email address</label>
                <input
                    id="email"
                    autocomplete="off"
                    class="input"
                    name="email"
                    pattern="[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+$"
                    placeholder="Enter your email address..."
                    required
                    type="email" />
            </div>
            <div class="field">
                <label class="login-label" for="password">Password</label>
                <input
                    id="password"
                    class="input"
                    name="password"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                    placeholder="Enter your password..."
                    required
                    title="Password must contain at least 8 characters, including one lowercase letter, one uppercase letter and one number."
                    type="password" />
            </div>
            <RouterLink to="/">Forgot your password?</RouterLink>
        </div>
        <div class="login">
            <div class="item">
                <input id="cbx" class="inp-cbx" style="display: none" type="checkbox" />
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
</template>

<style scoped>
a {
    color: var(--color-green);
    text-decoration: none;
}

#email.input {
    background: #dbe2ef;
    color: var(--color-black);
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
    margin-top: 100px;
    width: 90%;
}

.new-user {
    display: flex;
    justify-content: center;
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
    border: 2px solid var(--color-green);
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
    background: var(--color-green);
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
    border-color: var(--color-green);
}

.inp-cbx:checked + .cbx span:first-child {
    animation: wave 0.4s ease;

    background: var(--color-green);
    border-color: var(--color-green);
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

@media only screen and (min-width: 768px) {
    .login-form {
        width: 75%;
    }
}

@media only screen and (min-width: 1024px) {
    .login-form {
        width: 50%;
    }
}
</style>
