import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const instance = axios.create({
    baseURL: process.env.API_URL || 'https://alainmucyo-shop.fly.dev/api/'
});

// This interceptor runs before each request
instance.interceptors.request.use(config => {
    const authStore = useAuthStore();
    const token = authStore.getToken;
    console.log("token", token);
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }

    return config;
}, error => {
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(response => {
    // If the response was successful, there's no need to do anything, just return the response
    return response;
}, error => {
    if (error.response.status === 401 && error.config.url !== '/logout') {
        // If the response status was 401, it means the request was Unauthorized
        // We clear the user's data and log them out
        const authStore = useAuthStore();
        authStore.logout().then(() => {
            window.location = "/login";
        });
    }
    return Promise.reject(error);
});

export default instance;
