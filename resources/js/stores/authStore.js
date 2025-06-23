import { defineStore } from "pinia";
import axios from "axios";
import { router } from "@inertiajs/vue3";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
    }),

    getters: {
        isLoggedIn: (state) => !!state.user,
        getUser: (state) => state.user,
        isLoading: (state) => state.loading,
        getError: (state) => state.error,
    },

    actions: {
        async fetchUser() {
            try {
                const response = await axios.get("/api/user");
                this.user = response.data;
                this.isAuthenticated = true;
            } catch {
                this.user = null;
                this.isAuthenticated = false;
            }
        },

        async register(userData) {
            this.loading = true;
            this.error = null;
            try {
                await axios.get("/sanctum/csrf-cookie");
                const response = await axios.post("/api/register", {
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                    password_confirmation: userData.confirmPassword,
                });
                this.user = response.data.user;
                this.isAuthenticated = true;
                router.visit(route("post.index"));
                return { success: true, data: response.data };
            } catch (error) {
                this.error =
                    error.response?.data?.message || "Registration failed";
                return { success: false, error: this.error };
            } finally {
                this.loading = false;
            }
        },

        async login(credentials) {
            this.loading = true;
            this.error = null;
            try {
                await axios.get("/sanctum/csrf-cookie");
                const response = await axios.post("/api/login", {
                    email: credentials.email,
                    password: credentials.password,
                    remember: credentials.remember,
                });
                this.user = response.data.user;
                this.isAuthenticated = true;
                router.visit(route("post.index"));
                return { success: true, data: response.data };
            } catch (error) {
                this.error = error.response?.data?.message || "Login failed";
                return { success: false, error: this.error };
            } finally {
                this.loading = false;
            }
        },

        async logout() {
            this.loading = true;
            this.error = null;
            try {
                await axios.post("/api/logout");
            } catch (error) {
                // Ignore error
            } finally {
                this.user = null;
                this.isAuthenticated = false;
                this.loading = false;
                this.error = null;
                router.visit(route("login"));
            }
        },

        clearError() {
            this.error = null;
        },

        setUser(userData) {
            this.user = userData;
        },
    },
});
