import { defineStore } from 'pinia';
import router from '@/router';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const displayName = ref('');
    const profilePicture = ref('');

    function setToken(token: string, rememberMe: boolean) {
        if (rememberMe) {
            localStorage.setItem('token', token);
            sessionStorage.removeItem('token');
        } else {
            sessionStorage.setItem('token', token);
            localStorage.removeItem('token');
        }
    }

    function getToken(): string {
        const potentialTokens = [localStorage.getItem('token'), sessionStorage.getItem('token')];
        for (const potentialToken of potentialTokens) {
            if (potentialToken) {
                return potentialToken;
            }
        }
        return '';
    }

    function logout(): Promise<Boolean> {
        return new Promise<Boolean>((success, fail) => {
            const token = getToken();
            if (token) {
                fetch('http://localhost:3000/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token: token }),
                })
                    .then((res) => {
                        if (res.ok) {
                            sessionStorage.removeItem('token');
                            localStorage.removeItem('token');
                            router.push('/');
                            success(true);
                        } else {
                            fail('Response not OK');
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        fail('Failed to fetch');
                    });
            } else {
                fail('No token');
            }
        });
    }

    function getDisplayName() {
        return displayName.value;
    }

    function setDisplayName(newDisplayName: string) {
        displayName.value = newDisplayName;
    }

    function getProfilePicture() {
        return profilePicture.value;
    }

    function setProfilePicture(newProfilePicture: string) {
        profilePicture.value = newProfilePicture;
    }

    return { setToken, getToken, logout, getDisplayName, setDisplayName, getProfilePicture, setProfilePicture };
});
