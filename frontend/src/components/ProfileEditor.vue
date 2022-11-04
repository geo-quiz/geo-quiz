<script lang="ts" setup>
import GeoButton from '@/components/GeoButton.vue';
import GeoCheckbox from '@/components/GeoCheckbox.vue';
import PageNotification from '@/components/PageNotification.vue';
import PageLoad from '@/components/PageLoad.vue';
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
const isLeaderboardChecked = ref(true);
const isPasswordError = ref(false);
const passwordError = ref('');
const isCurrentPasswordValid = ref(true);
const isUpdated = ref(false);
const awaitingResponse = ref(false);
const deletionError = ref(false);
const deletionErrorText = ref('Something went wrong');

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{8,}$/;

const imageToUpload = ref();

function uploadImage() {
    const formData = new FormData();

    formData.append('image', imageToUpload.value.files[0]);
    formData.append('token', authStore.getToken());

    fetch('http://localhost:3000/upload-image', {
        method: 'POST',
        body: formData,
    })
        .then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    profilePicture.value = data.image;
                });
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

function deleteAccount() {
    showConfirmDeleteAccount.value = true;
}

function cancelDeletion() {
    showConfirmDeleteAccount.value = false;
    deleteAccountPassword.value = '';
}

function confirmDeletion() {
    showConfirmDeleteAccount.value = false;
    awaitingResponse.value = true;

    fetch('http://localhost:3000/delete-account', {
        method: 'POST',
        body: JSON.stringify({
            token: authStore.getToken(),
            password: deleteAccountPassword.value,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => {
            if (res.ok) {
                authStore
                    .logout()
                    .then(() => {
                        awaitingResponse.value = false;
                        router.push('/');
                    })
                    .catch((error) => {
                        console.error(error);
                        awaitingResponse.value = false;
                        router.push('/');
                    });
            } else {
                deletionError.value = true;
                deletionErrorText.value = res.statusText;
                awaitingResponse.value = false;
                deleteAccountPassword.value = '';
            }
        })
        .catch((error) => {
            console.error(error);
            deletionError.value = true;
            deletionErrorText.value = 'Something went wrong';
            awaitingResponse.value = false;
            deleteAccountPassword.value = '';
        });
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
    isCurrentPasswordValid.value = passwordPattern.test(currentPassword.value);
    if (isCurrentPasswordValid.value) {
        const token = authStore.getToken();
        if (token) {
            awaitingResponse.value = true;
            fetch('http://localhost:3000/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    password: currentPassword.value,
                    account: {
                        displayName: displayName.value,
                        profilePicture: profilePicture.value,
                        password: newPassword.value,
                        leaderboardParticipation: isLeaderboardChecked.value,
                    },
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        isUpdated.value = true;
                    } else {
                        const statusText = response.statusText;
                        if (statusText === 'Invalid password') {
                            isCurrentPasswordValid.value = false;
                        }
                        if (statusText === 'Display name already taken') {
                            isDisplayNameError.value = true;
                            isDisplayNameChanging.value = false;
                        }
                    }
                    awaitingResponse.value = false;
                })
                .catch((error) => {
                    console.error('Error:', error);
                    awaitingResponse.value = false;
                });
        } else {
            console.log('No token');
        }
    } else {
        isCurrentPasswordValid.value = false;
    }
}

function updateLeaderboardCheckedValue(value: boolean) {
    isLeaderboardChecked.value = value;
}

onMounted(() => {
    setTimeout(() => {
        displayName.value = authStore.getDisplayName();
        profilePicture.value = authStore.getProfilePicture();
    }, 500);
});
</script>

<template>
    <main>
        <h2>Your Profile</h2>
        <form id="profile-form" @submit.prevent="submitIfValid">
            <div id="profile-picture-wrapper" class="field">
                <div class="profile-picture-div">
                    <img id="profile-picture" :src="'http://127.0.0.1:3000/' + profilePicture" alt="Profile picture" />
                    <label id="upload-label" for="upload">
                        Upload <br />
                        Image
                    </label>
                    <input id="upload" ref="imageToUpload" accept="image/*" type="file" @input="uploadImage" />
                </div>
            </div>
            <div class="field">
                <label for="display-name">Display name</label>
                <input
                    id="display-name"
                    v-model="displayName"
                    autocomplete="off"
                    name="display-name"
                    placeholder="Display name"
                    required
                    type="text"
                    @input="isDisplayNameChanging = true" />
                <label v-if="isDisplayNameError && !isDisplayNameChanging" class="error">
                    Display name already taken
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
                    type="password"
                    @input="isCurrentPasswordValid = true" />
                <label v-if="!isCurrentPasswordValid" class="error">Invalid password</label>
            </div>
            <GeoButton id="save-button" color="green" @click.prevent="submitIfValid">Save</GeoButton>
            <small id="delete-account" @click="deleteAccount">Delete account</small>
        </form>
    </main>

    <PageNotification v-if="isUpdated || awaitingResponse || showConfirmDeleteAccount || deletionError">
        <div v-if="isUpdated || awaitingResponse || deletionError" class="notification-wrapper">
            <div v-if="isUpdated" class="wrapper">
                <p>Account details updated!</p>
                <div class="notification-button-wrapper">
                    <GeoButton size="small" @click="router.push('/home')">OK</GeoButton>
                </div>
            </div>
            <div v-if="awaitingResponse" class="wrapper">
                <PageLoad />
            </div>
            <div v-if="deletionError" class="wrapper">
                <p class="deletion-error">{{ deletionErrorText }}</p>
                <div class="notification-button-wrapper">
                    <GeoButton size="small" @click="deletionError = false">OK</GeoButton>
                </div>
            </div>
        </div>
        <form v-if="showConfirmDeleteAccount" id="deletion-form" @submit.prevent="confirmDeletion">
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
    max-width: 530px;
}

#deletion-field {
    gap: var(--gap);
}

#delete-account:hover {
    color: var(--color-white);
    cursor: pointer;
}

.deletion-error {
    text-align: center;
    overflow-wrap: normal;
    padding: 0 20px;
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

.notification-button-wrapper {
    width: 50%;
}

.notification-wrapper {
    align-items: center;
    background: var(--color-dark-blue);
    border-radius: var(--radius);
    display: flex;
    height: 175px;
    justify-content: center;
    width: 300px;
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

.wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    justify-content: center;
    width: 100%;
}
</style>
