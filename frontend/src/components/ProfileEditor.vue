<script lang="ts" setup>
import GeoButton from '@/components/GeoButton.vue';
import GeoCheckbox from '@/components/GeoCheckbox.vue';
import PageNotification from '@/components/PageNotification.vue';
import { onMounted, ref } from 'vue';
import router from '@/router/index';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const profilePicture = ref('');
const displayName = ref('');
const isDisplayNameChanging = ref(true);
const isDisplayNameError = ref(false);
const currentPassword = ref('');
const isPasswordChanging = ref(false);
const newPassword = ref('');
const confirmNewPassword = ref('');
const isEqualPassword = ref(false);
const isPasswordValid = ref(false);
const deleteAccountPassword = ref('');
const showConfirmDeleteAccount = ref(false);
const confirmDeleteAccount = ref(false);
const isLeaderboardChecked = ref(true);
const isPasswordError = ref(false);
const passwordError = ref('');

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{8,}$/;

function deleteAccount() {
    showConfirmDeleteAccount.value = true;
}

function cancelDeletion() {
    showConfirmDeleteAccount.value = false;
    deleteAccountPassword.value = '';
}

function confirmDeletion() {
    showConfirmDeleteAccount.value = false;
    confirmDeleteAccount.value = true;
}

function checkPassword() {
    clearPasswordErrors();
    isPasswordChanging.value = false;
    isEqualPassword.value = newPassword.value === confirmNewPassword.value;
    isPasswordValid.value = isValidPassword();
    if (!isPasswordValid.value) {
        isPasswordError.value = true;
    }
}

function clearPasswordErrors() {
    isPasswordError.value = false;
    passwordError.value = '';
}

function isValidPassword(): boolean {
    if (isEqualPassword.value) {
        if (passwordPattern.test(newPassword.value)) {
            return true;
        } else {
            passwordError.value = 'Invalid password format';
            return false;
        }
    } else {
        passwordError.value = 'Passwords do not match';
        return false;
    }
}

function submitIfValid() {
    let token;
    let possibleToken = localStorage.getItem('token');
    if (possibleToken) {
        token = possibleToken;
    } else {
        possibleToken = sessionStorage.getItem('token');
        if (possibleToken) {
            token = possibleToken;
        }
    }

    if (token) {
        fetch('https://localhost:3000/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // token: user.email,
                account: {
                    displayName: displayName.value,
                    // profilePicture: profilePicture.value,
                    password: newPassword.value,
                    leaderboardParticipation: isLeaderboardChecked.value,
                },
            }),
        })
            .then((response) => {
                if (response.ok) {
                    router.push('/home');
                } else {
                    const statusText = response.statusText;
                    console.log(statusText);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } else {
        router.push('/home');
        console.log('No token');
    }
}

function updateLeaderboardCheckedValue(value: boolean) {
    isLeaderboardChecked.value = value;
}

onMounted(() => {
    displayName.value = authStore.getDisplayName();
    profilePicture.value = authStore.getProfilePicture();
});
</script>

<template>
    <main>
        <h2>Your Profile</h2>
        <form id="profile-form">
            <div id="profile-picture-wrapper" class="field">
                <div class="profile-picture-div">
                    <img id="profile-picture" alt="Profile picture" src="/images/default-profile-picture.svg" />
                    <label id="upload-label" for="upload">
                        Upload <br />
                        Image
                    </label>
                    <input id="upload" accept="image/*" type="file" />
                </div>
            </div>
            <div class="field">
                <label for="display-name">Display name</label>
                <input
                    id="display-name"
                    :ref="displayName"
                    :value="displayName"
                    autocomplete="off"
                    name="display-name"
                    pattern="^[a-zA-Z]{3,}"
                    placeholder="Display name"
                    required
                    title="Display name must be at least 3 characters long and only contain letters"
                    type="text"
                    @input="isDisplayNameChanging = true" />
                <label v-if="isDisplayNameError && !isDisplayNameChanging" class="error">
                    DisplayName already taken
                </label>
            </div>
            <div class="password">
                <div class="field">
                    <label for="new-password">New Password</label>
                    <input
                        id="new-password"
                        v-model="newPassword"
                        autocomplete="off"
                        name="new-password"
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{8,}$"
                        placeholder="Enter a new password..."
                        title="Password must contain at least 8 characters, including one lowercase letter, one uppercase letter and one number. Password must not contain any symbols."
                        type="password"
                        @input="isPasswordChanging = true" />
                </div>
                <div class="field">
                    <label for="confirm-password">Confirm New Password</label>
                    <input
                        id="confirm-password"
                        v-model="confirmNewPassword"
                        autocomplete="off"
                        name="confirm-new-password"
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{8,}$"
                        placeholder="Confirm new password.."
                        title="Password must contain at least 8 characters, including one lowercase letter, one uppercase letter and one number. Password must not contain any symbols."
                        type="password"
                        @input="checkPassword" />
                </div>
                <label v-if="!isPasswordChanging && passwordError" class="error">{{ passwordError }}</label>
            </div>
            <div>
                <GeoCheckbox
                    :startingValue="isLeaderboardChecked"
                    class="extra-space"
                    @value="updateLeaderboardCheckedValue">
                    Leaderboard participation
                </GeoCheckbox>
            </div>
            <div class="field">
                <label for="display-name">Current Password</label>
                <input
                    id="current-password"
                    v-model="currentPassword"
                    autocomplete="off"
                    name="current-password"
                    placeholder="Enter your current password..."
                    type="password" />
            </div>
            <GeoButton id="save-button" color="green" @click.prevent="submitIfValid">Save</GeoButton>
            <small id="delete-account" @click="deleteAccount">Delete account</small>
        </form>
    </main>

    <PageNotification v-if="showConfirmDeleteAccount">
        <form id="deletion-form">
            <div id="deletion-field" class="field">
                <label for="display-name">Enter your password to confirm deletion of your account</label>
                <input
                    id="new-password"
                    v-model="deleteAccountPassword"
                    autocomplete="off"
                    name="delete-account-password"
                    placeholder="Enter your current password..."
                    type="password" />
                <div class="button-wrapper">
                    <GeoButton size="small" @click.prevent="cancelDeletion">Cancel</GeoButton>
                </div>
                <div class="button-wrapper">
                    <GeoButton color="red" size="small" @click.prevent="confirmDeletion">Confirm</GeoButton>
                </div>
            </div>
        </form>
    </PageNotification>
</template>

<style scoped>
.button-wrapper {
    width: calc(50% - var(--gap) / 2);
}

#delete-account {
    color: var(--color-red);
    font-size: 1rem;
}

#deletion-form {
    align-items: center;
    background: var(--color-dark-blue);
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 25px;
    text-align: center;
    width: 75%;
}

#deletion-field {
    gap: var(--gap);
}

#delete-account:hover {
    color: var(--color-white);
    cursor: pointer;
}

.error {
    color: var(--color-red);
    font-size: 1rem;
    height: 16px;
    margin: 0 0 -28px 0;
    text-align: center;
    width: 100%;
}

.field {
    display: flex;
    flex-wrap: wrap;
    gap: calc(var(--gap) / 2);
    justify-content: center;
    width: 100%;
}

.field label {
    width: 100%;
}

.field input {
    border-radius: var(--radius);
    font-size: 1rem;
    height: 50px;
    padding-left: 5px;
    width: calc(100% - var(--gap));
}

main {
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.password {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    width: 100%;
}

#profile-form {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 75%;
}

.profile-picture-div {
    align-items: center;
    display: flex;
    gap: var(--gap);
    justify-content: space-between;
    width: 100%;
}

#profile-picture {
    background: var(--color-light-blue);
    border: var(--color-blue) 5px solid;
    border-radius: 50%;
    height: 118px;
    object-fit: cover;
    width: 118px;
}

#profile-picture-wrapper {
    gap: calc(var(--gap) * 3);
}

#upload {
    display: none;
}

#upload-label {
    background-color: var(--color-blue);
    border: none;
    border-radius: var(--radius);
    color: var(--color-white);
    font-size: 1.25rem;
    padding: 10px 20px;
    text-align: center;
    width: fit-content;
}
</style>
