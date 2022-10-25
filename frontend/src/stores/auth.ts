import { defineStore } from 'pinia';
import router from '@/router';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const token = ref('');

    async function login(email: string, password: string, rememberMe: boolean) {
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then((data: any) => {
                if (!data.errorMessage) {
                    console.log('Data from fetch ', data);
                    if (rememberMe) {
                        localStorage.setItem('token', data.accessToken);
                        sessionStorage.removeItem('token');
                    } else {
                        sessionStorage.setItem('token', data.accessToken);
                        localStorage.removeItem('token');
                    }
                    router.push('/home');
                }
            });

        let possibleToken = localStorage.getItem('token');
        if (possibleToken) {
            token.value = possibleToken;
        }
        possibleToken = sessionStorage.getItem('token');
        if (possibleToken) {
            token.value = possibleToken;
        }
    }

    function setToken(newToken: string) {
        token.value = newToken;
    }

    function logout() {
        token.value = '';
        sessionStorage.removeItem('token');
        localStorage.removeItem('token');
        router.push('/');
    }

    return { token, login, logout, setToken };
});
