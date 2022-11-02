import { defineStore } from 'pinia';
import router from '@/router';
import type { Ref } from 'vue';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const token: Ref<string | null> = ref('');

    function setToken(newToken: string) {
        token.value = newToken;
    }

    function logout(): Promise<Boolean> {
        return new Promise<Boolean>((success, fail) => {
            let potentialToken = localStorage.getItem('token');
            if (potentialToken) {
                token.value = potentialToken;
            } else {
                potentialToken = sessionStorage.getItem('token.value');
                if (potentialToken) {
                    token.value = potentialToken;
                }
            }
            if (token.value) {
                fetch('http://localhost:3000/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token: token.value }),
                }).then((res) => {
                    if (res.ok) {
                        sessionStorage.removeItem('token');
                        localStorage.removeItem('token');
                        token.value = null;
                        router.push('/');
                        success(true);
                    } else {
                        fail('Response not OK');
                    }
                }).catch((error) => {
                    console.error(error);
                    fail('Failed to fetch');
                });
            } else {
                fail('No token');
            }
        });
    }

    return { token, logout, setToken };
});
