<script lang="ts" setup>
import GeoButton from '@/components/GeoButton.vue';</script>

<template>
    <form class="login-form">
        <div class="email">
            <label class="login-label" for="email">Email address</label>
            <input id="email" autocomplete="off" class="input" name="email" placeholder="Enter your email address..."
                   required
                   type="email">
        </div>
        <div class="password">
            <label class="login-label" for="password">Password</label>
            <input id="password" class="input" name="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                   placeholder="Enter your password..."
                   required
                   title="Password must contain at least 8 characters, including one lowercase letter, one uppercase letter and one number."
                   type="password" />
        </div>
        <form class="forgot-password">
            <a>Forgot your password?</a>
        </form>
        <div class="remember-me">
            <input id="remember" name="remember" type="checkbox" />
            <label for="remember">Remember me?</label>
        </div>
        <div class="login-form-buttons">
            <GeoButton id="login-button" font-size="1rem" height="85px" width="90% + 4px" @click="goTo('/quiz')">Login
            </GeoButton>
        </div>


        <form class="new-account">New user?
            <RouterLink to="/register">Create an account.</RouterLink>
        </form>
    </form>

</template>

<style scoped>
a {
    color: #5bb318;
    text-decoration: none;
}

button {
    width: 100%;
}

.email {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

#email.input {
    background: #dbe2ef;
    color: #dbe2ef;
}

.input {
    border: 0;
    border-radius: 10px;
    font-size: 1rem;
    height: 50px;
    margin: 0.5% 0;
    padding-left: 10px;
}

#login-button {
    background: #5bb318;
    color: #dbe2ef;
}


.login-label {
    color: #dbe2ef;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 90%;
}

.login-form-buttons {
    display: flex;
    justify-content: space-evenly;
}

.password {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

#password.input {
    background: #dbe2ef;
}

.remember-me {
    display: flex;
    gap: 8px;
}
</style>
