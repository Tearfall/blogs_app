import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null
    }),

    getters: {
        isLoggedIn: (state) => !!state.token && !!state.user,
        getUser: (state) => state.user,
        getToken: (state) => state.token,
        isLoading: (state) => state.loading,
        getError: (state) => state.error
    },

    actions: {
        // Initialize auth state (call this on app startup)
        async initAuth() {
            // Check if we're in a browser environment
            if (typeof window !== 'undefined' && window.localStorage) {
                const token = localStorage.getItem('auth_token');
                if (token) {
                    this.token = token;
                    // Set axios default header
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    this.isAuthenticated = true;

                    // Optionally fetch user data if you have a user endpoint
                    // await this.fetchUser();
                }
            }
        },

        // Register new user
        async register(userData) {
            this.loading = true;
            this.error = null;

            try {
                const response = await axios.post('/api/register', {
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                    password_confirmation: userData.confirmPassword
                });

                if (response.data.user && response.data.token) {
                    this.user = response.data.user;
                    this.token = response.data.token;
                    this.isAuthenticated = true;

                    // Store token in localStorage
                    if (typeof window !== 'undefined' && window.localStorage) {
                        localStorage.setItem('auth_token', this.token);
                    }

                    // Set axios default header
                    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

                    return { success: true, data: response.data };
                }
            } catch (error) {
                this.error = error.response?.data?.message || 'Registration failed';
                return { success: false, error: this.error };
            } finally {
                this.loading = false;
            }
        },

        // Login user
        async login(credentials) {
            this.loading = true;
            this.error = null;

            try {
                const response = await axios.post('/api/login', {
                    email: credentials.email,
                    password: credentials.password
                });

                if (response.data.user && response.data.token) {
                    this.user = response.data.user;
                    this.token = response.data.token;
                    this.isAuthenticated = true;

                    // Store token in localStorage
                    if (typeof window !== 'undefined' && window.localStorage) {
                        localStorage.setItem('auth_token', this.token);
                    }

                    // Set axios default header
                    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

                    return { success: true, data: response.data };
                } else if (response.data.message) {
                    this.error = response.data.message;
                    return { success: false, error: this.error };
                }
            } catch (error) {
                this.error = error.response?.data?.message || 'Login failed';
                return { success: false, error: this.error };
            } finally {
                this.loading = false;
            }
        },

        // Logout user
        async logout() {
            this.loading = true;
            this.error = null;

            try {
                if (this.token) {
                    await axios.post('/api/logout');
                }
            } catch (error) {
                console.error('Logout error:', error);
                // Continue with logout even if API call fails
            } finally {
                // Clear state
                this.user = null;
                this.token = null;
                this.isAuthenticated = false;
                this.loading = false;
                this.error = null;

                // Remove token from localStorage
                if (typeof window !== 'undefined' && window.localStorage) {
                    localStorage.removeItem('auth_token');
                }

                // Remove axios default header
                delete axios.defaults.headers.common['Authorization'];
            }
        },

        // Clear error
        clearError() {
            this.error = null;
        },

        // Set user data (useful if you fetch user data separately)
        setUser(userData) {
            this.user = userData;
        },

        // Check if token is valid (optional - you might want to implement a verify endpoint)
        async verifyToken() {
            if (!this.token) return false;

            try {
                // If you have a user verification endpoint, use it here
                // const response = await axios.get('/api/user');
                // this.user = response.data;
                return true;
            } catch (error) {
                // Token is invalid, clear auth state
                await this.logout();
                return false;
            }
        }
    }
})
