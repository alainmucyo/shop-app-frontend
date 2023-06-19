import { defineStore } from 'pinia';
import api from "@/utils/api";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuth: false,
        token: null,
        loading: false,
        failed: false,
        errorMsg: '',
        validationErrors: {},
    }),
    actions: {
        setAuth(value) {
            this.isAuth = value;
            return this.isAuth;
        },
        authenticate(token) {
            this.token = token;
            localStorage.setItem("token", token);
            return this.token;
        },
        setToken(token) {
            this.token = token;
            return this.token;
        },
        clearAuthData() {
            this.isAuth = false;
            this.token = null;
            this.failed = false;
            this.errorMsg = '';
            this.validationErrors = {};
        },
        async login(credentials) {
            try {
                this.loading = true;
                const { data } = await api.post("/login", credentials);
                this.authenticate(data.token);
                this.setAuth(true);
                return { success: true };
            } catch (e) {
                this.failed = true;
                this.validationErrors = {};
                this.errorMsg = '';
                if (e.response.status === 400) {
                    this.errorMsg = "Wrong email or password.";
                } else if (e.response.status === 422) {
                    this.validationErrors = e.response.data.errors;
                } else {
                    this.errorMsg = "Something went wrong.";
                }
                return { success: false, error: this.errorMsg, validationErrors: this.validationErrors };
            } finally {
                this.loading = false;
            }
        },
        async register(userDetails) {
            try {
                this.loading = true;
                const { data } = await api.post("/register", {
                    firstName: userDetails.firstName,
                    lastName: userDetails.lastName,
                    email: userDetails.email,
                    password: userDetails.password,
                    password_confirmation: userDetails.confirm_password
                });
                this.authenticate(data.token);
                this.setAuth(true);
                return { success: true };
            } catch (e) {
                this.failed = true;
                this.validationErrors = {};
                this.errorMsg = '';
                if (e.response.status === 422) {
                    this.validationErrors = e.response.data.errors;
                } else if (e.response.status === 400) {
                    const msg = e.response.data.message;
                    this.errorMsg = typeof msg == "string" ? msg : msg[0];
                } else {
                    this.errorMsg = "Something went wrong.";
                }
                return { success: false, error: this.errorMsg, validationErrors: this.validationErrors };
            } finally {
                this.loading = false;
            }
        },
        async logout() {
            try {
                await api.post("/logout");
            } catch (e) {
                console.error("Error logging out", e);
            }
            this.clearAuthData();
            localStorage.removeItem("token");
        }
    },
    getters: {
        getToken() {
            if (!this.token) {
                const token = localStorage.getItem("token");
                if (token) {
                    this.setToken(token);
                    this.setAuth(true);
                }
            }
            return this.token;
        },
        getAuth() {
            if (!this.isAuth) {
                const token = localStorage.getItem("token");
                if (token) {
                    this.setToken(token);
                    this.setAuth(true);
                }
            }
            return this.isAuth;
        }
    }
});
