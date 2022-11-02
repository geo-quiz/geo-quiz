import { defineStore } from 'pinia';
import router from '@/router';
import { ref } from 'vue';
import type { Ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const token: Ref<string | null> = ref('');
    const awaitingResponse = ref(false);

    function setToken(newToken: string) {
        token.value = newToken;
    }

    function logout() {
        let potentialToken = localStorage.getItem('token');
        if (potentialToken) {
            token.value = potentialToken;
            console.log('Local ', token.value);
        } else {
            potentialToken = sessionStorage.getItem('token.value');
            if (potentialToken) {
                token.value = potentialToken;
                console.log('Session ', token.value);
            }
        }
        if (token.value) {
            awaitingResponse.value = true;
            fetch('http://localhost:3000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: token.value }),
            }).then((res) => {
                awaitingResponse.value = false;
                if (res.ok) {
                    sessionStorage.removeItem('token');
                    localStorage.removeItem('token');
                    token.value = null;
                    router.push('/');
                } else {
                    alert('Something went wrong');
                }
            });
        } else {
            alert('Something went wrong');
        }
    }

    return { token, logout, setToken };
});
