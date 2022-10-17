<script lang="ts" setup>
import GeoButton from '@/components/GeoButton.vue';</script>
<template>
    <form class="register-form">
        <div class="fields">
            <div class="field">
                <label class="register-label" for="email">Email address</label>
                <input id="email" autocomplete="off" class="input" name="email"
                       pattern="^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+$"
                       placeholder="Enter your email address..."
                       required
                       type="email">
            </div>
            <div class="field">
                <label class="register-label" for="password">Password</label>
                <input id="password" class="input" name="password"
                       pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{8,}$"
                       placeholder="Enter your password..."
                       required
                       title="Password must contain at least 8 characters, including one lowercase letter, one uppercase letter and one number. Password must not contain any symbols."
                       type="password" />
            </div>
            <div class="field">
                <label class="register-label" for="password">Confirm password</label>
                <input id="password" class="input" name="password"
                       pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{8,}$"
                       placeholder="Enter your password..."
                       required
                       title="Password must contain at least 8 characters, including one lowercase letter, one uppercase letter and one number. Password must not contain any symbols."
                       type="password" />
            </div>
        </div>
        <div class="register">
        </div>
        <GeoButton id="register-button" color="green">Register</GeoButton>
        <div class="new-user">
            <p>Already a user?
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

#email.input {
    background: #dbe2ef;
    color: var(--color-black);
}

.field {
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) / 2)
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

.new-user {
    display: flex;
    justify-content: center;
}

#password.input {
    background: #dbe2ef;
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

.register-form {
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) * 2);
    margin-top: 100px;
    width: 90%;
}

@media only screen and (min-width: 768px) {
    .register-form {
        width: 75%;
    }
}

@media only screen and (min-width: 1024px) {
    .register-form {
        width: 50%;
    }
}
</style>
