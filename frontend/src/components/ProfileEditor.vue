<script lang="ts" setup>
import GeoButton from '@/components/GeoButton.vue';
import PageNotification from '@/components/PageNotification.vue';
import { onMounted, ref } from 'vue';

const user = {
    email: 'marcus.leeman@iths.se',
    displayName: 'DarkendHall',
    picture: '',
};

const displayName = ref('');
const currentPassword = ref('');
const isPasswordChanging = ref(false);
const newPassword = ref('');
const confirmNewPassword = ref('');
const isPasswordValid = ref(false);
const deleteAccountPassword = ref('');
const showConfirmDeleteAccount = ref(false);
const confirmDeleteAccount = ref(false);
const isLeaderboardChecked = ref(false);

const imageRef = ref('');

function saveImage(event: Event) {
    if (event.target) {
        let target = event.target as HTMLInputElement;
        let image = target.files![0];
        let imageObject = URL.createObjectURL(image);
        localStorage.setItem('profileImage', imageObject);
        getImage();
    }
}

function getImage() {
    const image = localStorage.getItem('profileImage');
    if (image) {
        imageRef.value = image;
    }
}

function updateDisplayNameValue(event: InputEvent) {
    if (event.target) {
        let target = event.target as HTMLInputElement;
        displayName.value = target.value;
    }
    console.log(displayName.value);
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
    confirmDeleteAccount.value = true;
}

function checkPassword() {
    isPasswordChanging.value = true;
    isPasswordValid.value = newPassword.value === confirmNewPassword.value;
}

function submitIfValid() {
    if (isPasswordValid.value) {
        const form = document.querySelector('#register-form') as HTMLFormElement;
        if (form) {
            form.submit();
        }
    }
}

onMounted(() => {
    if (user) {
        displayName.value = user.displayName;
        if (user.picture) {
            imageRef.value = user.picture;
        } else {
            imageRef.value = '/images/default-profile-picture.svg';
        }
    }
});
</script>

<template>
    <main>
        <h2>Your Profile</h2>
        <form id="profile-form">
            <div id="profile-picture-wrapper" class="field">
                <div class="profile-picture-div">
                    <img id="profile-picture" :src="imageRef" alt="Profile picture" />
                    <label id="upload-label" for="upload">
                        Upload <br />
                        Image
                    </label>
                    <input id="upload" accept="image/*" type="file" @change="saveImage" />
                </div>
            </div>
            <div class="field">
                <label for="display-name">Display name</label>
                <input
                    id="display-name"
                    :value="displayName"
                    autocomplete="off"
                    name="display-name"
                    required
                    type="text"
                    @input="updateDisplayNameValue" />
            </div>
            <div class="password">
                <div class="field">
                    <label for="display-name">New Password</label>
                    <input
                        id="new-password"
                        v-model="newPassword"
                        name="new-password"
                        autocomplete="off"
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{8,}$"
                        placeholder="Enter a new password..."
                        title="Password must contain at least 8 characters, including one lowercase letter, one uppercase letter and one number. Password must not contain any symbols."
                        type="password"
                        @input="checkPassword" />
                </div>
                <div class="field">
                    <label for="display-name">Confirm New Password</label>
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
                <label v-if="!isPasswordValid && isPasswordChanging" id="password-dont-match">
                    Passwords don't match or don't follow the correct format
                </label>
            </div>
            <div>
                <div class="item">
                    <input
                        id="cbx"
                        :value="isLeaderboardChecked"
                        class="inp-cbx"
                        style="display: none"
                        type="checkbox" />
                    <label class="cbx" for="cbx">
                        <span>
                            <svg height="10px" viewbox="0 0 12 10" width="12px">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                            </svg>
                        </span>
                        <span>Leaderboard participation</span>
                    </label>
                </div>
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
    </main>
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
    margin-top: 120px;
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
    margin-top: 120px;
    width: 100%;
}

.password {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    width: 100%;
}

#password-dont-match {
    color: var(--color-red);
    font-size: 1rem;
    margin-top: 10px;
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
    padding-left: 8px;
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
