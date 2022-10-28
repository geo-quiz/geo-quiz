import { defineStore } from 'pinia';
import router from '@/router';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const token = ref('');

    function setToken(newToken: string) {
        token.value = newToken;
    }

    function logout() {
        token.value = '';
        sessionStorage.removeItem('token');
        localStorage.removeItem('token');
        router.push('/');
    }

    return { token, logout, setToken };
});
